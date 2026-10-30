import { motion } from "framer-motion";
import { lazy, Suspense, useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { toast } from "sonner";

import { EMAIL, SOCIALS } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { isLite } from "../utils/device";
import { useInView } from "../utils/useInView";
import { useLanguage } from "../context/LanguageContext";
import { SectionHeading } from "./Rich";

// The 3D Earth (and three.js) only downloads when the contact section is close.
const EarthCanvas = lazy(() => import("./canvas/earth"));

const EarthSlot = () => {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "400px", once: true });
  const lite = isLite();

  return (
    <div ref={ref} className="h-full w-full">
      {lite ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="aspect-square w-3/5 max-w-[320px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#4f7bd8,#1d3570_55%,#060b1d)] shadow-[0_0_80px_rgba(79,123,216,0.35)]" />
        </div>
      ) : (
        near && (
          <Suspense fallback={null}>
            <EarthCanvas />
          </Suspense>
        )
      )}
    </div>
  );
};

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type Field = "name" | "email" | "message";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-cream placeholder:text-muted/70 outline-none transition focus:border-accent/60 focus:bg-white/[0.05] disabled:opacity-50";

// Contact
export const Contact = () => {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<Field, boolean>>({ name: false, email: false, message: false });
  const [loading, setLoading] = useState(false);

  // handle form change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // validate form on submit
  const validateForm = () => {
    const next = {
      name: form.name.trim().length < 3,
      email: !form.email.trim().toLowerCase().match(EMAIL_REGEX),
      message: form.message.trim().length < 5,
    };
    setErrors(next);
    return !next.name && !next.email && !next.message;
  };

  // handle form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Template params for email to YOURSELF (notification)
    const notificationParams = {
      from_name: form.name,
      from_email: form.email.trim().toLowerCase(),
      message: form.message,
      to_name: "Kuber",
      to_email: import.meta.env.VITE_APP_EMAILJS_RECIEVER || EMAIL,
    };

    // Template params for AUTO-REPLY to USER
    const autoReplyParams = {
      from_name: form.name,
      user_email: form.email.trim().toLowerCase(), // IMPORTANT: Match with template variable
      message: form.message,
    };

    // emailjs is only downloaded when someone actually sends a message
    import("@emailjs/browser")
      .then(({ default: emailjs }) => {
        // 1. Send email to YOURSELF (notification)
        const emailToYou = emailjs.send(
          import.meta.env.VITE_APP_SERVICE_ID,
          import.meta.env.VITE_APP_TEMPLATE_ID, // Your notification template
          notificationParams,
          import.meta.env.VITE_APP_EMAILJS_KEY,
        );

        // 2. Send auto-reply to USER
        const autoReplyToUser = emailjs.send(
          import.meta.env.VITE_APP_SERVICE_ID,
          import.meta.env.VITE_APP_AUTOREPLY_TEMPLATE_ID, // Auto-reply template ID
          autoReplyParams,
          import.meta.env.VITE_APP_EMAILJS_KEY,
        );

        // Send both emails in parallel
        return Promise.all([emailToYou, autoReplyToUser]);
      })
      .then(() => {
        toast.success(t("contact.success"));
      })
      .catch((error) => {
        console.log("[CONTACT_ERROR]: ", error);
        toast.error(t("contact.error"));
      })
      .finally(() => {
        setLoading(false);
        setForm({ name: "", email: "", message: "" });
      });
  };

  const socials = SOCIALS.filter((s) => s.name !== "Email");

  return (
    <SectionWrapper idName="contact">
      <motion.div variants={textVariant()}>
        <SectionHeading index="06" label={t("contact.label")} title={t("contact.title")} className="max-w-4xl" />
      </motion.div>

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: intro, email, socials, Earth */}
        <motion.div variants={fadeIn("up", undefined, 0.1, 0.8)} className="flex flex-col lg:col-span-5">
          <p className="max-w-md text-lg leading-relaxed text-cream/65">{t("contact.description")}</p>

          <p className="mt-10 text-xs uppercase tracking-[0.24em] text-muted">{t("contact.or_email")}</p>
          <a
            href={`mailto:${EMAIL}`}
            className="group mt-3 inline-flex w-fit items-baseline gap-2 break-all font-serif text-3xl italic text-cream transition hover:text-accent-soft sm:text-4xl"
          >
            {EMAIL}
            <span className="text-xl not-italic text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
          </a>

          <ul className="mt-8 flex flex-wrap gap-2">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-cream/80 transition hover:border-white/30 hover:text-cream"
                >
                  <img src={social.icon} alt="" width={16} height={16} className="h-4 w-4 opacity-80" />
                  {social.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 h-[320px] sm:h-[420px] lg:mt-auto lg:h-[380px]">
            <EarthSlot />
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div variants={fadeIn("up", undefined, 0.2, 0.8)} className="lg:col-span-7">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6 rounded-[2rem] border border-white/[0.08] bg-surface p-6 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label htmlFor="name" className="flex flex-col gap-3">
                <span className="text-sm font-medium text-cream/80">{t("contact.name_label")}</span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("contact.name_placeholder")}
                  disabled={loading}
                  aria-invalid={errors.name}
                  className={inputClass}
                />
                {errors.name && <span className="text-sm text-red-400">{t("contact.invalid_name")}</span>}
              </label>

              <label htmlFor="email" className="flex flex-col gap-3">
                <span className="text-sm font-medium text-cream/80">{t("contact.email_label")}</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("contact.email_placeholder")}
                  disabled={loading}
                  aria-invalid={errors.email}
                  className={inputClass}
                />
                {errors.email && <span className="text-sm text-red-400">{t("contact.invalid_email")}</span>}
              </label>
            </div>

            <label htmlFor="message" className="flex flex-col gap-3">
              <span className="text-sm font-medium text-cream/80">{t("contact.message_label")}</span>
              <textarea
                rows={8}
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t("contact.message_placeholder")}
                disabled={loading}
                aria-invalid={errors.message}
                className={`${inputClass} resize-none`}
              />
              {errors.message && <span className="text-sm text-red-400">{t("contact.invalid_message")}</span>}
            </label>

            <button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              className="group mt-2 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-cream text-base font-medium text-ink transition hover:bg-accent disabled:opacity-60 sm:w-fit sm:px-10"
            >
              {loading ? t("contact.sending") : t("contact.send")}
              {!loading && <span className="transition-transform group-hover:translate-x-1">→</span>}
            </button>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
