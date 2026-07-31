import Image from 'next/image';
import Link from 'next/link';
import { PageHero, SectionHeader } from '@/components/ui/Section';
import Testimonials from '@/components/Testimonials/Testimonials';
import Newsletter from '@/components/Newsletter/Newsletter';
import { site } from '@/lib/site';
import { waGeneral } from '@/lib/whatsapp';
import styles from './page.module.css';

export const metadata = {
  title: 'About us',
  description: `${site.name} — a travel agency for people who would rather explore than sightsee, with hyper-local expertise across Madhya Pradesh and visa-free Asia.`,
  alternates: { canonical: '/about' },
};

/**
 * >>> REWRITE THIS PAGE IN YOUR OWN WORDS <<<
 * The copy below describes how the agency positions itself according to the
 * brief, but it makes no claims about founding dates, team size or trips run,
 * because those are yours to state accurately. Add your real story, your
 * photograph and your credentials before launch — this is the page that
 * converts sceptical visitors, and generic copy is what loses them.
 */
export default function AboutPage() {
  const principles = [
    {
      title: 'We tell you when not to go',
      text: 'Half our job is talking people out of the wrong month. Monsoon in Ladakh, May in Rajasthan, a Kedarnath trek without acclimatisation — we would rather lose a booking than sell you a bad week.',
    },
    {
      title: 'Local knowledge, not a call centre',
      text: 'We work the destinations we sell. That means knowing which safari zone has the sightings, which houseboat cuts its generator overnight, and which viewpoint is empty at seven in the morning.',
    },
    {
      title: 'Written quotes, no pressure',
      text: 'Everything is in writing before you pay anything — inclusions, exclusions and the cancellation terms that actually apply. We do not do countdown timers or "only two seats left".',
    },
    {
      title: 'Someone answers at 11pm',
      text: 'A coordinator on WhatsApp for the whole trip, plus local numbers for every city on your itinerary. The point of using an agent is having someone to call when something goes wrong.',
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Find the places that never made the guidebook"
        subtitle="We are a small travel agency built around a simple idea: the best trips are the ones planned by someone who has actually been there."
        image="/images/dest-heritage.webp"
      />

      <section className="section">
        <div className={`container ${styles.story}`}>
          <div className="prose">
            <p>
              Most travel agencies sell the same twelve destinations from the same three suppliers.
              We started {site.name} because that is not how anyone we know actually wants to
              travel.
            </p>

            <h2>Madhya Pradesh is our home ground</h2>
            <p>
              This is the part we are genuinely specialist in. Khajuraho, Pachmarhi, Bandhavgarh
              and Kanha are world-class and chronically under-visited — largely because the big
              agencies cannot be bothered with a region that does not sell itself.
            </p>
            <p>
              We know the lodges worth the money, the naturalists worth requesting, and the permit
              system well enough to get you into the zones that actually produce sightings. That is
              not marketing; it is just where we live.
            </p>

            <h2>And beyond it</h2>
            <p>
              For the rest of India and for international trips we lean towards what a small agency
              can service properly: domestic circuits and the visa-free and visa-on-arrival
              countries across Asia, where the paperwork is light and the value is high. Europe and
              North America we run too, but only where we have direct supplier relationships worth
              having.
            </p>
          </div>

          <figure className={styles.figure}>
            <div className={styles.figureMedia}>
              <Image
                src="/images/dest-wildlife.webp"
                alt="Bandhavgarh National Park"
                fill
                sizes="(max-width: 900px) 100vw, 380px"
                className={styles.figureImage}
              />
            </div>
            <figcaption>
              Bandhavgarh — the highest density of wild tigers anywhere, four hours from our office.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeader
            title="How we work"
            subtitle="Four things we will not compromise on, even when it costs us a booking."
          />
          <div className={styles.principles}>
            {principles.map((principle, index) => (
              <article key={principle.title} className={styles.principle}>
                <span className={styles.principleNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials heading="In their words" />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className={`container ${styles.cta}`}>
          <h2>Tell us where you want to go</h2>
          <p>
            No forms that vanish into a void. Message us and a person replies — usually within a
            couple of hours during working days.
          </p>
          <div className={styles.ctaButtons}>
            <a
              href={waGeneral()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn btn-outline btn-lg">
              Send an enquiry
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
