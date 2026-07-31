import { site } from './site';

const WA_BASE = 'https://wa.me';

/**
 * Build a wa.me deep link with a prefilled message.
 * Works on mobile (opens the app) and desktop (opens WhatsApp Web).
 */
export function waLink(message) {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `${WA_BASE}/${site.whatsapp}${text}`;
}

/** Generic "I'm interested" opener used by the floating button and nav CTA. */
export function waGeneral() {
  return waLink(
    `Hi ${site.name}! I'd like to plan a trip. Could you help me with the details?`
  );
}

/** Enquiry about a specific package. */
export function waPackage(pkg) {
  return waLink(
    [
      `Hi ${site.name}! I'm interested in the "${pkg.title}" package.`,
      `Duration: ${pkg.duration}`,
      `Listed from: ${formatINR(pkg.priceFrom)} per person`,
      '',
      'Could you share availability and a detailed quote?',
    ].join('\n')
  );
}

/** Enquiry about a specific destination. */
export function waDestination(destination) {
  return waLink(
    `Hi ${site.name}! I'd like to know more about travelling to ${destination.name}, ${destination.location}. What packages do you have?`
  );
}

/**
 * Full enquiry form submission. Fields the traveller left blank are omitted
 * so the message stays readable.
 */
export function waEnquiry(fields) {
  const lines = [`Hi ${site.name}! I'd like to plan a trip.`, ''];

  const rows = [
    ['Name', fields.name],
    ['Phone', fields.phone],
    ['Email', fields.email],
    ['Trip type', fields.tripType],
    ['Destination', fields.destination],
    ['Travellers', fields.travellers],
    ['Travel dates', fields.dates],
    ['Budget', fields.budget],
  ];

  for (const [label, value] of rows) {
    if (value && String(value).trim()) lines.push(`${label}: ${String(value).trim()}`);
  }

  if (fields.message && fields.message.trim()) {
    lines.push('', `Message: ${fields.message.trim()}`);
  }

  return waLink(lines.join('\n'));
}

/** Newsletter opt-in — there is no mailing list backend, so this starts a chat. */
export function waSubscribe() {
  return waLink(
    `Hi ${site.name}! Please add me to your travel updates — I'd like to hear about new trips and offers.`
  );
}

/** ₹ formatting used across cards, detail pages and WhatsApp messages. */
export function formatINR(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '';
  return `₹${amount.toLocaleString('en-IN')}`;
}
