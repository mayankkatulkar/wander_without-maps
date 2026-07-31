import { waSubscribe } from '@/lib/whatsapp';
import styles from './Newsletter.module.css';

/**
 * "Get the next journey in your inbox" — block 6 of the homepage wireframe.
 *
 * There is no mailing-list backend on this site, so rather than showing an
 * email field that silently throws the address away, this opens a WhatsApp
 * chat asking to be added to updates. Honest, and it actually reaches someone.
 *
 * If you later add a real ESP (Mailchimp, Brevo, Buttondown), swap this
 * component's body for a form posting to that provider and keep the layout.
 */
export default function Newsletter({ compact = false }) {
  return (
    <section className={`${styles.wrap} ${compact ? styles.compact : ''}`}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Get the next journey in your inbox</h2>
        <p className={styles.text}>
          Travel stories, destination guides and trips we are running next season. We send it
          rarely, and never sell your details.
        </p>
        <a
          href={waSubscribe()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp btn-lg"
        >
          Subscribe on WhatsApp
        </a>
      </div>
    </section>
  );
}
