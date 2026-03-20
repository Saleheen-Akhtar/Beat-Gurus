import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const MAX_DEV_CONTACT_BODY_BYTES = 64 * 1024

class PayloadTooLargeError extends Error {}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    let totalBytes = 0
    req.on('data', (chunk) => {
      totalBytes += chunk.length
      if (totalBytes > MAX_DEV_CONTACT_BODY_BYTES) {
        reject(new PayloadTooLargeError('Request body too large'))
        req.destroy()
        return
      }
      data += chunk
    })
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function setDevCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function contactDevApiPlugin() {
  const handler = async (req, res, next) => {
    const pathname = new URL(req.url || '/', 'http://localhost').pathname
    if (pathname !== '/api/contact') return next()

    setDevCorsHeaders(res)

    if (req.method === 'OPTIONS') {
      res.statusCode = 200
      res.setHeader('Allow', 'POST, OPTIONS')
      res.end()
      return
    }
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Allow', 'POST, OPTIONS')
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, message: 'Method not allowed' }))
      return
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (!webhookUrl) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        success: false,
        message: 'Set GOOGLE_SHEETS_WEBHOOK_URL to enable local /api/contact testing.'
      }))
      return
    }

    try {
      const payload = await readJsonBody(req)
      const upstream = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!upstream.ok) {
        res.statusCode = 502
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, message: `Webhook upstream error: ${upstream.status}` }))
        return
      }

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: true, message: "Inquiry submitted! We'll get back to you soon." }))
    } catch (error) {
      if (error instanceof PayloadTooLargeError) {
        res.statusCode = 413
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, message: 'Request body too large.' }))
        return
      }
      if (error instanceof SyntaxError) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, message: 'Invalid JSON in request body.' }))
      } else {
        res.statusCode = 502
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, message: 'Local contact proxy failed.' }))
      }
    }
  }

  return {
    name: 'contact-dev-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), contactDevApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
