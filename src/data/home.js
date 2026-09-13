/** Homepage editorial selections. Catalogue facts stay in their source data. */
export const heroScenes = [
  { id: 'mountains', name: 'The mountains are calling', mood: 'Find your altitude', image: '/images/cinematic-mountain.webp', position: 'center 48%' },
  { id: 'coast', name: 'A slower kind of somewhere', mood: 'Follow the tide', image: '/images/dest-beach.webp', position: 'center 52%' },
  { id: 'forest', name: 'Take the road less travelled', mood: 'Into the green', image: '/images/dest-hillstation.webp', position: 'center 45%' },
];

export const destinationCollections = [
  { id: 'handpicked', label: 'Our favourites', icon: 'sparkle', slugs: ['spiti-valley', 'bali', 'jaisalmer', 'pachmarhi'] },
  { id: 'mountains', label: 'Mountains', icon: 'mountain', slugs: ['spiti-valley', 'ladakh', 'munnar', 'bhutan'] },
  { id: 'beaches', label: 'Coast & islands', icon: 'sun', slugs: ['bali', 'maldives', 'andaman-islands', 'gokarna'] },
  { id: 'wild', label: 'Into the wild', icon: 'leaf', slugs: ['bandhavgarh', 'kanha', 'ranthambore', 'kaziranga'] },
];

export const signatureTripSlugs = ['spiti-valley-circuit', 'maldives-overwater-honeymoon', 'mp-tiger-circuit'];

export const travelWays = [
  { title: 'Just the two of you.', description: 'For the beginning of your next chapter.', label: 'Honeymoon escapes', image: '/images/dest-beach.webp', href: '/packages/?purpose=honeymoon', icon: 'heart' },
  { title: 'A little more adventure.', description: 'For the stories you haven’t lived yet.', label: 'The great outdoors', image: '/images/hero-mountain.webp', href: '/experiences/adventure-outdoor/', icon: 'mountain' },
  { title: 'Everyone. Together.', description: 'For the moments that become family stories.', label: 'Family journeys', image: '/images/dest-hillstation.webp', href: '/packages/?purpose=family', icon: 'sun' },
];

export const journalSlugs = ['finding-silence-khajuraho', 'crossing-spiti-motorcycle', 'slow-travel-kerala-backwaters'];

export const scrollChapters = [
  { id: 'breathe', word: 'Breathe.', label: 'A LITTLE PERSPECTIVE', title: 'Lose the noise.', emphasis: 'Find your quiet.', description: 'Somewhere between the mountain air and the morning light, the everyday starts to feel a world away.', image: '/images/cinematic-mountain.webp', href: '/destinations/?environment=Mountains', cta: 'Answer the mountains' },
  { id: 'wander', word: 'Wander.', label: 'A BEAUTIFUL DETOUR', title: 'Leave the familiar.', emphasis: 'Follow the feeling.', description: 'Golden horizons. Unhurried days. The kind of wrong turn you’ll talk about for years.', image: '/images/dest-desert.webp', href: '/destinations/jaisalmer/', cta: 'Chase a golden horizon' },
  { id: 'become', word: 'Become.', label: 'A DIFFERENT KIND OF RETURN', title: 'Go a little further.', emphasis: 'Come back different.', description: 'Salt on your skin. A little space in your mind. And a story that could only ever be yours.', image: '/images/dest-beach.webp', href: '/destinations/?environment=Islands', cta: 'Find your island time' },
];
