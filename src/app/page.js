import Image from 'next/image';
import Link from 'next/link';
import CinematicHero from '@/components/CinematicHero/CinematicHero';
import DestinationCollection from '@/components/DestinationCollection/DestinationCollection';
import HeroSearch from '@/components/HeroSearch/HeroSearch';
import Reveal from '@/components/Reveal/Reveal';
import Testimonials from '@/components/Testimonials/Testimonials';
import { CardGrid, PackageCard } from '@/components/Cards/Cards';
import Icon from '@/components/ui/Icon';
import { destinations } from '@/data/destinations';
import { packages } from '@/data/packages';
import { stories } from '@/data/stories';
import { destinationCollections, signatureTripSlugs, travelWays, journalSlugs } from '@/data/home';
import styles from './page.module.css';

export const metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  const featured = signatureTripSlugs.map(slug => packages.find(trip => trip.slug === slug)).filter(Boolean);
  const journal = journalSlugs.map(slug => stories.find(story => story.slug === slug)).filter(Boolean);
  const selectedSlugs = new Set(destinationCollections.flatMap(collection => collection.slugs));
  const collectionDestinations = destinations.filter(place => selectedSlugs.has(place.slug)).map(({ slug, name, location, image, environment, idealDuration }) => ({ slug, name, location, image, environment, idealDuration }));

  return <>
    <div className={styles.opening}>
      <CinematicHero />
      <div className={styles.searchDock}><HeroSearch /></div>
      <div className={'container ' + styles.assurances}>
        <div><Icon name="compass" size={23} /><span><strong>{destinations.length} places. Endless possibilities.</strong><small>From our backyard to your bucket list</small></span></div>
        <div><Icon name="sparkle" size={23} /><span><strong>Made for you. Only you.</strong><small>Personal journeys, down to the little things</small></span></div>
        <div><Icon name="pin" size={23} /><span><strong>Local hearts. Insider knowledge.</strong><small>Our roots are in Madhya Pradesh</small></span></div>
      </div>
    </div>

    <section className={'container ' + styles.intro}>
      <Reveal className={styles.introEyebrow}><span className={styles.smallRule} /> A DIFFERENT WAY TO GET AWAY</Reveal>
      <Reveal delay={100}><h2>You don’t need another holiday.<br />You need a little <em>wonder.</em></h2></Reveal>
      <Reveal delay={200}><p>The hush before a mountain sunrise. A wrong turn that feels right.<br className={styles.desktopBreak} /> A place that stays with you, long after you’ve left.<br />That’s the kind of travel we believe in.</p></Reveal>
      <Reveal delay={250}><Link href="/about/" className={styles.textLink}>A little about us <Icon name="diagonal" size={16} /></Link></Reveal>
      <span className={styles.introCompass} aria-hidden="true"><Icon name="compass" size={135} /></span>
    </section>

    <section id="discover" className={'container ' + styles.destinations}>
      <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>01 / FIND YOUR SOMEWHERE</p><h2>Where will your<br /><em>curiosity take you?</em></h2></div><div className={styles.headingAside}><p>Some places call a little louder.<br />These are a few of ours.</p><Link href="/destinations/" className={styles.textLink}>Explore all destinations <Icon name="diagonal" size={16} /></Link></div></Reveal>
      <Reveal delay={100}><DestinationCollection destinations={collectionDestinations} /></Reveal>
    </section>

    <div className={styles.marquee} aria-hidden="true"><div className={styles.marqueeTrack}>{[0, 1].map(copy => <div key={copy} className={styles.marqueeGroup}><span>Take the scenic route.</span><Icon name="sparkle" size={33} /><em>Collect moments.</em><Icon name="sparkle" size={33} /><span>Leave a little different.</span><Icon name="sparkle" size={33} /></div>)}</div></div>

    <section className={styles.ways}>
      <div className="container">
        <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>02 / YOUR KIND OF WANDER</p><h2>Follow a feeling.<br /><em>We’ll find the place.</em></h2></div><p className={styles.waysAside}>There’s no one way to see the world.<br />Only the way that feels like you.</p></Reveal>
        <div className={styles.waysGrid}>{travelWays.map((way, index) => <Reveal key={way.title} delay={index * 100}><Link className={styles.wayCard} href={way.href}><Image src={way.image} alt="" fill sizes="(max-width:640px) 90vw, 31vw" className={styles.wayImage} /><span className={styles.wayScrim} /><span className={styles.wayIcon}><Icon name={way.icon} size={22} /></span><div className={styles.wayContent}><p>{way.label}</p><h3>{way.title}</h3><span className={styles.wayDescription}>{way.description}</span><span className={styles.wayArrow}><Icon name="diagonal" size={21} /></span></div></Link></Reveal>)}</div>
      </div>
    </section>

    <section className={'container ' + styles.spotlight}>
      <div className={styles.spotlightMedia}>
        <Reveal className={styles.forestFrame}><Image src="/images/dest-wildlife.webp" alt="Illustrative Bengal tiger in a sunlit forest" fill sizes="(max-width:640px) 90vw, 45vw" className={styles.spotlightImage} /><span className={styles.imageNote}><span /> WILD AT HEART</span></Reveal>
        <Reveal delay={160} className={styles.postcard}><div><Image src="/images/dest-heritage.webp" alt="Illustrative Indian heritage architecture" fill sizes="(max-width:640px) 40vw, 220px" /></div><p>A little closer to the extraordinary.</p></Reveal>
        <span className={styles.homeStamp} aria-hidden="true"><Icon name="compass" size={25} /><span>OUR HOME.<br />YOUR NEXT ADVENTURE.</span></span>
      </div>
      <Reveal className={styles.spotlightCopy} delay={120}><p className={styles.kicker}>CLOSE TO OUR HEART. FAR FROM ORDINARY.</p><h2>India’s best-kept<br />secret.<br /><em>Our home ground.</em></h2><p>Welcome to Madhya Pradesh. A place of wild forests, ancient stories, and the kind of quiet you didn’t know you needed.</p><p>From the temple trails of Khajuraho to the tiger country of Bandhavgarh, we know this place by heart. Let us show you its soul.</p><Link href="/destinations/?collection=madhya-pradesh" className="btn btn-primary">Discover Madhya Pradesh <Icon name="diagonal" size={17} /></Link><span className={styles.signature}>From our home, with love.</span></Reveal>
    </section>

    <section className={styles.signatureSection}><div className="container">
      <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>03 / BEAUTIFULLY PUT TOGETHER</p><h2>Good trips happen.<br /><em>Great ones are crafted.</em></h2></div><div className={styles.headingAside}><p>Thoughtful itineraries. Room for serendipity.<br />Every journey can be made your own.</p><Link href="/packages/" className={styles.textLink}>All curated journeys <Icon name="diagonal" size={16} /></Link></div></Reveal>
      <Reveal delay={120}><CardGrid>{featured.map(pkg => <PackageCard key={pkg.slug} pkg={pkg} />)}</CardGrid></Reveal>
      <p className={styles.priceNote}>Starting prices per person. Final details and pricing are confirmed in your personalised quote.</p>
    </div></section>

    <section className={'container ' + styles.philosophy}>
      <Reveal className={styles.philosophyHeading}><p className={styles.kicker}>THE LITTLE THINGS ARE THE BIG THINGS</p><h2>Less planning.<br /><em>More being there.</em></h2><Link href="/contact/" className={styles.textLink}>Let’s create something special <Icon name="diagonal" size={16} /></Link></Reveal>
      <div className={styles.steps}>{[
        ['01', 'A conversation, not a checklist.', 'Tell us what you love, who’s coming, and what you’re dreaming of. We start by listening.'],
        ['02', 'Your journey. Your rhythm.', 'We bring the local know-how, thoughtful stays, and a plan with room to breathe. You make it yours.'],
        ['03', 'Go. We’ve got the details.', 'With your itinerary in place and your coordinator on WhatsApp, you can be present for the good part.'],
      ].map(([number, title, text], index) => <Reveal key={number} delay={index * 100} className={styles.step}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><Icon name={['heart', 'compass', 'sun'][index]} size={25} /></Reveal>)}</div>
    </section>

    <Testimonials limit={3} />

    <section className={styles.interlude}><Image src="/images/cinematic-mountain.webp" alt="" fill sizes="100vw" className={styles.interludeImage} /><div className={styles.interludeScrim} /><Reveal className={styles.interludeCopy}><Icon name="compass" size={33} /><p>NO TWO JOURNEYS. NO TWO TRAVELLERS.</p><h2>The best things happen<br /><em>outside the itinerary.</em></h2><Link href="/contact/" className={styles.interludeLink}>Let’s see where we end up <Icon name="diagonal" size={18} /></Link></Reveal></section>

    <section className={'container ' + styles.journal}>
      <Reveal className={styles.sectionHeading}><div><p className={styles.kicker}>NOTES FROM THE ROAD</p><h2>A little inspiration.<br /><em>A lot of wanderlust.</em></h2></div><Link href="/stories/" className={styles.textLink}>Open the journal <Icon name="diagonal" size={16} /></Link></Reveal>
      <div className={styles.journalGrid}>{journal.map((story, index) => <Reveal key={story.slug} delay={index * 100}><Link href={'/stories/' + story.slug + '/'} className={styles.story}><div className={styles.storyImage}><Image src={story.image} alt="" fill sizes="(max-width:640px) 90vw, 31vw" /></div><p className={styles.storyMeta}>{story.category} <span>{story.readTime} MIN READ</span></p><h3>{story.title}</h3><span className={styles.storyLink}>Read the story <Icon name="diagonal" size={15} /></span></Link></Reveal>)}</div>
    </section>
  </>;
}
