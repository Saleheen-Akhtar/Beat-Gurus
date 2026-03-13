import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:5173")
        await asyncio.sleep(1) # wait for animation
        await page.screenshot(path="/home/jules/verification/preloader3.png")
        await asyncio.sleep(1) # wait more
        await page.screenshot(path="/home/jules/verification/preloader4.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
