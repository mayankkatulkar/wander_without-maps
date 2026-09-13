# Visual design and homepage

## Direction

The supplied Wander Without Maps logo anchors the palette: white backgrounds,
navy ink and muted gold accents. Large landscape imagery, generous whitespace,
fine rules, rounded image frames and italic serif emphasis give the site an
editorial travel identity. Cormorant Garamond handles display typography, DM Sans
handles reading and controls, and Oswald remains available for condensed labels.
Shared colour, spacing, typography and transition variables live in
`src/app/globals.css`.

The visual system applies across existing routes through the shared header,
footer, cards, controls and global styles. Search, catalogue filters, detail
pages, contact forms and WhatsApp hand-offs retain their existing routes and
data sources.

## Homepage sequence

`src/app/page.js` assembles the following sections:

1. Cinematic hero, landscape controls and trip-search dock.
2. Service assurances and the brand introduction.
3. Destination collections with four selectable themes.
4. Decorative travel marquee and three travel-style cards.
5. Madhya Pradesh editorial spotlight with overlapping image frames.
6. Three signature journeys linked to catalogue packages.
7. The three-step planning process.
8. Testimonials, displayed only when real review data is available.
9. A full-width mountain interlude and enquiry link.
10. Three selected journal stories, followed by the shared footer invitation.

The previous `Matchmaker` and `JourneyTabs` components remain in the repository
but are not rendered by the current homepage. This presentation change does not
remove their underlying catalogue routes.

## Editable selections

`src/data/home.js` contains the homepage's editorial configuration:

| Export | Controls |
| --- | --- |
| `heroScenes` | Landscape IDs, captions, mood labels, image paths and focal positions |
| `destinationCollections` | Tab IDs, labels, icons and ordered destination slugs |
| `signatureTripSlugs` | Ordered package selections |
| `travelWays` | Travel-style titles, descriptions, labels, images, links and icons |
| `journalSlugs` | Ordered story selections |

Use existing catalogue slugs when changing selections. Names, locations,
durations, prices and other catalogue facts are read from `src/data/destinations.js`,
`src/data/packages.js` and `src/data/stories.js`. The homepage resolves only its
selected destination summaries for the interactive collection.

The current catalogue contains 50 destinations, 23 packages, 8 experiences and
8 stories. The homepage destination count comes directly from the data array.

## Components and interaction

| Component | Responsibility |
| --- | --- |
| `CinematicHero` | Landscape layers, staged headline entrance, slow image drift, scroll parallax, manual scene buttons and the animation control |
| `DestinationCollection` | Ordered destination cards, accessible tabs, card entrances and mobile horizontal scrolling |
| `MotionProvider` | Shared motion state and device reduced-motion preference |
| `Reveal` | One-time section entrances as content enters the viewport |
| `Header` | Supplied logo, navigation, trip-planning action and mobile menu |
| `Footer` | Closing trip-planning invitation, supplied logo, catalogue links and business contacts |

The hero has three manually selected scenes: mountains, coast and forest.
Numbered buttons expose the selected state with `aria-pressed`; the changing
caption uses a polite live region. Scenes do not advance on a timer. The first
hero image is preloaded, and images are decorative where the surrounding text
already carries their meaning.

Destination collections use a tab list and labelled panel. Left and Right
arrows select the adjacent tab and wrap at the ends; Home and End select the
first and last tabs. Focus moves with the selected tab. On small screens the
cards use horizontal scrolling with scroll snapping.

The mobile menu closes on route changes, Escape and a change to the desktop
breakpoint. It prevents background scrolling while open and keeps keyboard
focus within the visible header controls and menu links. Escape returns focus
to the menu button.

## Motion behaviour

The hero's pause button sets the shared motion state through `MotionProvider`
in the root layout. When paused, CSS animations stop, transitions become
effectively immediate, reveal content stays visible and hero parallax is
disabled. This preference persists through client-side navigation for the
current mounted application; it is not stored across page reloads.

Device `prefers-reduced-motion` settings take precedence. Changes to that setting
are observed while the page is open. When reduced motion is enabled, the
animation button communicates the device preference and is disabled. CSS media
queries also suppress decorative movement before hydration. Reveal content
remains visible when JavaScript is unavailable.

## Image provenance

`public/images/brand-logo.png` is the supplied logo, preserved byte for byte.
Header and footer display that same original asset without recolouring or
redrawing it.

The new mountain landscape was generated with the built-in OpenAI image
generation tool for this design. It is an illustrative fictional composite,
not documentary photography or a representation of a specific destination.
The image was visually inspected before and after WebP optimization.

| Asset | Dimensions | Size | Use |
| --- | --- | --- | --- |
| `public/images/cinematic-mountain.webp` | 1672 × 941 | 213,420 bytes | Hero and landscape interlude |
| `public/images/cinematic-mountain-mobile.webp` | 1100 × 619 | 116,030 bytes | Prepared smaller variant; not currently selected by the components |
| `assets-source/images/cinematic-mountain.png` | 1672 × 941 | 2,379,633 bytes | Local original; source-asset directory is ignored by Git |

The WebP files use Sharp with quality 86 and encoder effort 6. The desktop
conversion is capped at 2200 pixels without enlargement, preserving the
generated image's native 1672-pixel width. The smaller variant is resized to
1100 pixels wide. The six existing catalogue scene images remain illustrative
placeholders. Replace them with real destination photography as described in
the README's existing launch requirements; business details, prices, policies
and review content still need the same verification.

### Exact hero generation prompt

> Use case: photorealistic-natural. Asset type: premium travel website hero, panoramic 16:9 landscape, high resolution. Create an extraordinary but believable editorial photograph of a Himalayan-style mountain wilderness: massive jagged blue-gray snow-capped peaks rising across center and upper right, deep evergreen pine forest foothills, and a luminous turquoise river winding from the distant valley toward the lower foreground. Pale dawn sky, delicate valley mist, subtle warm golden sunrise from the far right. View from an elevated overlook, commanding scale and atmospheric depth, crisp natural rock and forest textures, restrained cinematic colors, luxury travel magazine quality. The left third should have quieter dark forest and mountain slopes with ample uncluttered space for a white headline added later; landscape fills the frame. No text, logo, watermark, people, buildings, roads, temples, fantasy features, or oversaturation.
