export const FINAL_MEDIA_LINK = 'https://drive.google.com/drive/folders/1YsDWWyZWExfwH7IlHyGNXINr4XNiRGp1?usp=drive_link';

export const showTypes = [
  {
    id: 'flute-fusion',
    slug: 'flute-fusion',
    title: 'Flute Fusion',
    cardDescription: 'Melodic winds soaring above the rhythm section to create a spiritual, cinematic ambience.',
    heroImage: 'https://images.unsplash.com/photo-1460036521480-15bc755fb34a?q=80&w=1400&auto=format&fit=crop',
    align: 'left',
    duration: '45-90 minutes',
    idealFor: 'Luxury weddings, sunset sets, heritage venues',
    highlights: ['Live bansuri + djembe interplay', 'Ambient to high-energy dynamic arc', 'Tailored setlist to event mood'],
    gallery: [
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop'
    ],
    faqs: [
      { question: 'Can this format be fully acoustic?', answer: 'Yes. We can run this set unplugged for intimate spaces or add light reinforcement for large venues.' },
      { question: 'Do you support custom entrance pieces?', answer: 'Absolutely. We can prepare a custom flute-led entrance, first dance, or welcome score.' }
    ]
  },
  {
    id: 'drum-circle',
    slug: 'drum-circle',
    title: 'Drum Circle',
    cardDescription: 'Hands-on interactive rhythm sessions designed to unite crowds and energize teams.',
    heroImage: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=1400&auto=format&fit=crop',
    align: 'right',
    duration: '30-75 minutes',
    idealFor: 'Corporate offsites, schools, community festivals',
    highlights: ['Guided participation for all skill levels', 'Call-and-response rhythm games', 'Group finale performance moment'],
    gallery: [
      'https://images.unsplash.com/photo-1508979828022-e638a62a7b4f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?q=80&w=1200&auto=format&fit=crop'
    ],
    faqs: [
      { question: 'How many participants can join?', answer: 'From 15 to 500+ participants. We scale with additional facilitators and instruments.' },
      { question: 'Do attendees need experience?', answer: 'Not at all. This format is beginner-friendly and accessible to all age groups.' }
    ]
  },
  {
    id: 'dj-x-percussion',
    slug: 'dj-x-percussion',
    title: 'DJ X Percussion',
    cardDescription: 'Electronic grooves fused with raw live drums for peak-time dancefloor impact.',
    heroImage: 'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?q=80&w=1400&auto=format&fit=crop',
    align: 'left',
    duration: '60-120 minutes',
    idealFor: 'Nightlife events, product launches, destination weddings',
    highlights: ['Live percussion over curated DJ set', 'Drop-synced stage choreography', 'Flexible genres: afro-house, techno, Bollywood, pop'],
    gallery: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop'
    ],
    faqs: [
      { question: 'Can we provide our own DJ?', answer: 'Yes. Our percussionists can collaborate with your DJ and sync to your planned set.' },
      { question: 'Is stage production included?', answer: 'We provide input for lighting cues and stage flow; full production can be coordinated with your vendor.' }
    ]
  }
];

export const showTypeMap = Object.fromEntries(showTypes.map((show) => [show.slug, show]));
