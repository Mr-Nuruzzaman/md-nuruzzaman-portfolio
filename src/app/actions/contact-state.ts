/** Shared shape for the contact server action — kept outside the 'use server' module,
 *  which may only export async functions. */
export type ContactState = {
  ok: boolean;
  /** Machine-readable outcome. `unconfigured` = no RESEND_API_KEY, client should show the mailto fallback. */
  reason?: 'unconfigured' | 'validation' | 'send_failed';
  /** Human message for the live region. */
  message?: string;
  /** Per-field validation errors, keyed by field name. */
  errors?: Partial<Record<'name' | 'email' | 'message', string>>;
};

export const initialContactState: ContactState = { ok: false };
