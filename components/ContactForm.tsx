"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", email: "", phone: "", message: "" };

function validate(values: FormState): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length < 2) errors.name = "That name looks too short.";

  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";

  if (values.phone.trim() && values.phone.replace(/\D/g, "").length < 10)
    errors.phone = "Please enter a valid phone number.";

  if (!values.message.trim()) errors.message = "Please tell us a little about your plans.";
  else if (values.message.trim().length < 10)
    errors.message = "A few more details would help us prepare.";

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSubmitted(true);
    setValues(initialState);
  };

  const fieldClass = (field: keyof FormState) =>
    `w-full rounded-2xl border bg-white px-5 py-4 text-sm text-navy placeholder:text-navy/35 transition-colors focus:outline-none ${
      errors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-navy/15 focus:border-navy/50"
    }`;

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center rounded-3xl bg-navy px-8 py-20 text-center text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-brown-light text-2xl"
          >
            ✓
          </motion.div>
          <h3 className="mt-8 text-3xl font-bold tracking-tightest">
            Message received.
          </h3>
          <p className="mt-4 max-w-sm text-white/70">
            Thanks for reaching out. One of our agents will be in touch within one
            business day.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            data-cursor-hover
            className="mt-8 text-sm font-medium text-brown-light underline underline-offset-4"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-navy">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                placeholder="Jane Doe"
                className={fieldClass("name")}
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="jane@example.com"
                className={fieldClass("email")}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy">
              Phone <span className="text-navy/40">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder="(555) 000-0000"
              className={fieldClass("phone")}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-2 text-xs text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Tell us about the home you're looking for, or the one you're ready to sell."
              className={`${fieldClass("message")} resize-none`}
            />
            {errors.message && (
              <p id="message-error" className="mt-2 text-xs text-red-500">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            data-cursor-hover
            className="w-full rounded-full bg-navy px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:opacity-60 sm:w-auto"
          >
            {sending ? "Sending…" : "Send Message"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
