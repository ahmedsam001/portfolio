import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="bg-bg-alt border-t border-border py-8"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Name + role */}
        <div className="text-center sm:text-left">
          <p className="font-heading font-bold text-text-primary text-sm">
            {profile.name}
          </p>
          <p className="text-xs font-mono text-text-secondary mt-0.5">
            {profile.role} · {profile.subtitle}
          </p>
        </div>

        {/* Copyright */}
        {/* <p className="text-xs text-text-secondary font-mono">
          © {year} {profile.name}. Built with Next.js & Tailwind CSS.
        </p> */}

        {/* Quick links */}
        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-4" role="list">
            {[
              { label: "GitHub", href: profile.links.github },
              { label: "LinkedIn", href: profile.links.linkedin },
              { label: "Email", href: profile.links.email },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="text-xs font-mono text-text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

