"use client";

import { useEffect, useRef, useState } from "react";
import { Linkedin, MessageCircle, Github, Mail } from "lucide-react";
import { profile } from "@/data/profile";

interface ContactButton {
  label: string;
  sublabel: string;
  href: string;
  icon: React.ReactNode;
  variant: "primary" | "outline" | "cta";
  ariaLabel: string;
}

const contacts: ContactButton[] = [
  {
    label: "LinkedIn",
    sublabel: "Connect on LinkedIn",
    href: profile.links.linkedin,
    icon: <Linkedin size={24} aria-hidden="true" />,
    variant: "outline",
    ariaLabel: "Connect with Ahmed Sami Fathi on LinkedIn (opens in new tab)",
  },
  {
    label: "WhatsApp",
    sublabel: "Chat on WhatsApp",
    href: profile.links.whatsapp,
    icon: <MessageCircle size={24} aria-hidden="true" />,
    variant: "outline",
    ariaLabel: "Chat with Ahmed Sami Fathi on WhatsApp (opens in new tab)",
  },
  {
    label: "GitHub",
    sublabel: "View on GitHub",
    href: profile.links.github,
    icon: <Github size={24} aria-hidden="true" />,
    variant: "outline",
    ariaLabel: "View Ahmed Sami Fathi's GitHub profile (opens in new tab)",
  },
  {
    label: "Send Email",
    sublabel: "ahmedssami@gmail.com",
    href: profile.links.email,
    icon: <Mail size={24} aria-hidden="true" />,
    variant: "cta",
    ariaLabel: "Send Ahmed Sami Fathi an email",
  },
];

export default function Connect() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-bg-base"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className={`mb-10 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-xs font-mono font-medium text-primary uppercase tracking-widest mb-2">
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            className="font-heading font-bold text-2xl sm:text-3xl text-text-primary"
          >
            Let&apos;s Connect
          </h2>
          <p className="text-text-secondary mt-3 text-base max-w-lg mx-auto">
            Open to Junior Data Engineer / Analytics Engineer roles. Reach out on whichever
            channel works best for you.
          </p>
        </div>

        {/* Buttons grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-500 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {contacts.map((contact, i) => {
            const isExternal = !contact.href.startsWith("mailto:");
            const baseDelay = i * 60;

            if (contact.variant === "cta") {
              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center gap-2 px-6 py-6 rounded-2xl bg-accent hover:bg-accent-dark text-text-on-dark font-heading font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-1 min-h-[100px]"
                  aria-label={contact.ariaLabel}
                  style={{ transitionDelay: `${baseDelay}ms` }}
                >
                  <span className="text-text-on-dark">{contact.icon}</span>
                  <div>
                    <p className="text-sm font-bold">{contact.label}</p>
                    <p className="text-xs opacity-80 font-normal font-mono mt-0.5 break-all">
                      {contact.sublabel}
                    </p>
                  </div>
                </a>
              );
            }

            return (
              <a
                key={contact.label}
                href={contact.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-2xl bg-surface border-2 border-border hover:border-primary text-text-secondary hover:text-primary hover:bg-primary-tint font-heading font-semibold transition-all duration-200 hover:shadow-card hover:-translate-y-1 min-h-[100px]"
                aria-label={contact.ariaLabel}
                style={{ transitionDelay: `${baseDelay}ms` }}
              >
                <span>{contact.icon}</span>
                <div>
                  <p className="text-sm font-bold">{contact.label}</p>
                  <p className="text-xs text-text-secondary font-normal font-mono mt-0.5">
                    {contact.sublabel}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

