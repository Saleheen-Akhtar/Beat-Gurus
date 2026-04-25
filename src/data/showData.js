export const FINAL_MEDIA_LINK = 'https://drive.google.com/drive/folders/1YsDWWyZWExfwH7IlHyGNXINr4XNiRGp1?usp=drive_link';

export const showTypes = [
  {
    id: 'flute-fusion',
    slug: 'flute-fusion',
    title: 'Flute Fusion',
    cardDescription: 'A pure rhythmic aura created by playing Indian melody using percussion from all around the world.',
    fullDescription: 'Consists of 6-8 artists on stage that play several instruments like Djembe, Darbouka, Digeridoo, Congo, Dun Dun Drums, Flute, Drum kit, Brazil drum, tamate, Chande and several side percussion along with cymbals, creating a pure rhythmic aura by playing Indian melody using percussion from all around the world. This creates a fusion of western rhythms and Indian melody leaving the viewers mesmerized.',
    heroImage: 'https://images.unsplash.com/photo-1460036521480-15bc755fb34a?q=80&w=1400&auto=format&fit=crop',
    align: 'left',
    duration: '45-90 minutes',
    idealFor: 'Corporate get togethers and stage events where the motto is to watch and be entertained',
    highlights: ['6-8 artists on stage', 'Fusion of western rhythms and Indian melody', 'Features Djembe, Darbouka, Digeridoo, Flute and more'],
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
    cardDescription: 'A workshop type event that makes the audience interact throughout the sessions.',
    fullDescription: 'Consists of 2-6 artists (depending upon the size of the audience) on stage while everyone in the audience gets their own drum. This is a workshop type event that makes the audience interact throughout the sessions. All the people play drums along with the artists on stage creating several different rhythms and providing a good exercise session to the bodies of the audience.',
    heroImage: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=1400&auto=format&fit=crop',
    align: 'right',
    duration: '30-75 minutes',
    idealFor: 'Get togethers, corporate gatherings, weddings, etc. where everyone can participate',
    highlights: ['2-6 artists leading the session', 'Everyone in the audience gets their own drum', 'Interactive rhythm creation and exercise'],
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
    cardDescription: 'A fusion that provides a lively touch to the DJ night and fills the whole crowd with energy.',
    fullDescription: 'Consists of 2-6 artists depending on the client’s requirement. This is a setup where the client books the DJ separately and we come with our percussion and mix the percussion rhythms along with the DJ tracks. This is a fusion that provides a lively touch to the DJ night and fills the whole crowd with energy.',
    heroImage: 'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?q=80&w=1400&auto=format&fit=crop',
    align: 'left',
    duration: '60-120 minutes',
    idealFor: 'Parties, Clubs, Sangeet, Corporate Parties, etc. where the audience wants to dance',
    highlights: ['2-6 artists mixing live percussion with DJ tracks', 'High-energy fusion for dancefloors', 'Flexible and scalable setup based on requirements'],
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
