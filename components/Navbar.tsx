"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download, Database } from "lucide-react";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    setActive(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-surface/80 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-primary font-heading font-bold text-lg hover:text-primary-dark transition-colors"
          aria-label="Ahmed Sami Fathi — Home"
        >
          <Database size={20} className="text-primary" aria-hidden="true" />
          <span className="hidden sm:inline text-text-primary">
            Ahmed<span className="text-primary"> Sami</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === link.href
                    ? "text-primary bg-primary-tint"
                    : "text-text-secondary hover:text-primary hover:bg-primary-tint/50"
                }`}
              >
                {link.label}
                {active === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={profile.links.cv}
          download="Ahmed_Sami_Fathi_CV.pdf"
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-accent hover:bg-accent-dark text-text-on-dark text-sm font-semibold font-heading transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          aria-label="Download Ahmed Sami Fathi's CV as PDF"
        >
          <Download size={15} aria-hidden="true" />
          Download CV
        </a>

        {/* Mobile right side */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={profile.links.cv}
            download="Ahmed_Sami_Fathi_CV.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-dark text-text-on-dark text-xs font-semibold transition-colors"
            aria-label="Download CV"
          >
            <Download size={13} aria-hidden="true" />
            <span>CV</span>
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-tint transition-colors"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden mobile-menu bg-surface border-t border-border shadow-card"
          role="dialog"
          aria-label="Navigation menu"
        >
          <ul className="px-4 py-3 space-y-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-tint transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

