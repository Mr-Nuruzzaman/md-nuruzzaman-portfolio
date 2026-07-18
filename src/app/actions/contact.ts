'use server';

import type { ContactState } from './contact-state';
import { profile } from '@/data/profile';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_TO = profile.email;

function validate(name: string, email: string, message: string): ContactState['errors'] {
  const errors: NonNullable<ContactState['errors']> = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  else if (name.length > 100) errors.name = 'Name is too long.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  else if (email.length > 200) errors.email = 'Email is too long.';
  if (message.length < 10) errors.message = 'Message should be at least 10 characters.';
  else if (message.length > 4000) errors.message = 'Message is too long (4000 characters max).';
  return Object.keys(errors).length > 0 ? errors : undefined;
}

/**
 * Contact form server action (useActionState signature).
 * Honeypot-guarded, server-validated, sends via the Resend REST API.
 * Degrades to `{ ok: false, reason: 'unconfigured' }` when RESEND_API_KEY is absent
 * so the client can fall back to a plain mailto link. Never throws to the client.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users leave this empty. If filled, pretend success and drop the message.
  const trap = String(formData.get('company') ?? '').trim();
  if (trap) return { ok: true, message: 'Thanks — your message has been sent.' };

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  const errors = validate(name, email, message);
  if (errors) {
    return { ok: false, reason: 'validation', message: 'Please fix the highlighted fields.', errors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: 'unconfigured', message: 'The form is not configured yet — please email directly.' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [CONTACT_TO],
        reply_to: email,
        subject: `Portfolio contact — ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      return {
        ok: false,
        reason: 'send_failed',
        message: 'Something went wrong sending your message. Please email directly.',
      };
    }

    return { ok: true, message: 'Thanks — your message has been sent. I usually reply within 48 hours.' };
  } catch {
    return {
      ok: false,
      reason: 'send_failed',
      message: 'Something went wrong sending your message. Please email directly.',
    };
  }
}
