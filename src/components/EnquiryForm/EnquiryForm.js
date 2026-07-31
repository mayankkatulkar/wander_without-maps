'use client';

import { useState } from 'react';
import { waEnquiry } from '@/lib/whatsapp';
import { TRIP_PURPOSES } from '@/data/taxonomy';
import styles from './EnquiryForm.module.css';

const BUDGETS = [
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,00,000',
  'Above ₹2,00,000',
];

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  tripType: '',
  destination: '',
  travellers: '',
  dates: '',
  budget: '',
  message: '',
};

/**
 * Trip enquiry form.
 *
 * There is no server backend: on submit this composes the answers into a
 * WhatsApp message and opens a chat with the agency. That means nothing is
 * stored until the traveller actually presses send in WhatsApp — which is
 * exactly why the button says so.
 */
export default function EnquiryForm({ presetDestination = '', presetTripType = '', compact = false }) {
  const [values, setValues] = useState({
    ...EMPTY,
    destination: presetDestination,
    tripType: presetTripType,
  });
  const [errors, setErrors] = useState({});
  const [handedOff, setHandedOff] = useState(false);

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please tell us your name';
    // Indian mobile numbers are 10 digits; allow +91, spaces and dashes.
    const digits = values.phone.replace(/\D/g, '');
    if (!values.phone.trim()) next.phone = 'We need a number to call you back on';
    else if (digits.length < 10) next.phone = 'That number looks too short';
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = 'That email address does not look right';
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first field with a problem.
      const first = document.getElementById(`enq-${Object.keys(found)[0]}`);
      first?.focus();
      return;
    }
    window.open(waEnquiry(values), '_blank', 'noopener,noreferrer');
    setHandedOff(true);
  };

  if (handedOff) {
    return (
      <div className={styles.done} role="status">
        <span className={styles.doneIcon} aria-hidden="true">
          💬
        </span>
        <h3>WhatsApp is open in a new tab</h3>
        <p>
          Your details are already typed into the message — press <strong>send</strong> in WhatsApp
          to reach us. Nothing has been submitted until you do.
        </p>
        <button type="button" className="btn btn-outline" onClick={() => setHandedOff(false)}>
          Edit my details
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <Field
          id="enq-name"
          label="Your name"
          required
          value={values.name}
          onChange={update('name')}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="enq-phone"
          label="Phone / WhatsApp"
          type="tel"
          required
          value={values.phone}
          onChange={update('phone')}
          error={errors.phone}
          autoComplete="tel"
          placeholder="+91 98765 43210"
        />
        <Field
          id="enq-email"
          label="Email"
          type="email"
          value={values.email}
          onChange={update('email')}
          error={errors.email}
          autoComplete="email"
          hint="Optional"
        />

        <div className={styles.field}>
          <label htmlFor="enq-tripType">Trip type</label>
          <select id="enq-tripType" value={values.tripType} onChange={update('tripType')}>
            <option value="">Not sure yet</option>
            {Object.values(TRIP_PURPOSES).map((p) => (
              <option key={p.slug} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <Field
          id="enq-destination"
          label="Destination"
          value={values.destination}
          onChange={update('destination')}
          hint="Optional"
          placeholder="Spiti, Bali, still deciding…"
        />

        {!compact && (
          <>
            <Field
              id="enq-travellers"
              label="Travellers"
              value={values.travellers}
              onChange={update('travellers')}
              hint="Optional"
              placeholder="2 adults, 1 child"
            />
            <Field
              id="enq-dates"
              label="Travel dates"
              value={values.dates}
              onChange={update('dates')}
              hint="Optional"
              placeholder="Mid-October, or exact dates"
            />
            <div className={styles.field}>
              <label htmlFor="enq-budget">
                Budget per person <span className={styles.hint}>Optional</span>
              </label>
              <select id="enq-budget" value={values.budget} onChange={update('budget')}>
                <option value="">Prefer not to say</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="enq-message">
          Anything else? <span className={styles.hint}>Optional</span>
        </label>
        <textarea
          id="enq-message"
          rows={compact ? 3 : 4}
          value={values.message}
          onChange={update('message')}
          placeholder="Tell us what kind of trip you have in mind."
        />
      </div>

      <button type="submit" className="btn btn-whatsapp btn-lg btn-block">
        <WhatsAppGlyph />
        Send enquiry on WhatsApp
      </button>
      <p className={styles.disclaimer}>
        This opens WhatsApp with your details filled in. You press send — we never message you
        first.
      </p>
    </form>
  );
}

function Field({ id, label, error, hint, required, ...rest }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        {label}
        {required ? <span className={styles.req} aria-hidden="true"> *</span> : null}
        {hint ? <span className={styles.hint}>{hint}</span> : null}
      </label>
      <input
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={error ? styles.invalid : undefined}
        {...rest}
      />
      {error ? (
        <span id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.2-.298.3-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.465 3.49" />
    </svg>
  );
}
