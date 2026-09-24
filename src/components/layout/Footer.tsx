import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { BRAND } from '@/lib/config';
import { cn } from '@/lib/cn';

interface Column {
  title: string;
  links: { label: string; to: string }[];
}

const COLUMNS: Column[] = [
  {
    title: 'Boutique',
    links: [
      { label: 'Tous les cafés', to: '/shop' },
      { label: 'Espresso', to: '/shop/espresso' },
      { label: 'Origines', to: '/shop/origines' },
      { label: 'Accessoires', to: '/shop/accessoires' },
      { label: 'Abonnement', to: '/subscription' },
    ],
  },
  {
    title: 'Maison',
    links: [
      { label: 'À propos', to: '/about' },
      { label: 'Journal', to: '/blog' },
      { label: 'Contact', to: '/contact' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Aide',
    links: [
      { label: 'Livraison', to: '/legal/livraison' },
      { label: 'Retours', to: '/legal/retours' },
      { label: 'CGV', to: '/legal/cgv' },
      { label: 'Confidentialité', to: '/legal/confidentialite' },
    ],
  },
];

function ColumnBlock({ column }: { column: Column }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-2 text-left sm:pointer-events-none sm:cursor-default"
      >
        <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-cream">
          {column.title}
        </h4>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'h-4 w-4 text-cream/60 transition-transform sm:hidden',
            open && 'rotate-180',
          )}
        />
      </button>
      <ul
        className={cn(
          'grid overflow-hidden transition-all duration-300 sm:!grid-rows-[1fr] sm:opacity-100',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <li className="min-h-0">
          <ul className="flex flex-col gap-2.5 pb-3 pt-1">
            {column.links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-cream/70 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

function IconPill({ children, href, label }: { children: ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-cream/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:text-gold"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    window.setTimeout(() => setSubscribed(false), 2600);
  };

  return (
    <footer className="relative mt-24 overflow-hidden bg-espresso text-cream/75">
      {/* subtle glass glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-caramel/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-2xl font-black text-cream">
              <span className="h-2 w-2 rounded-full bg-caramel" aria-hidden="true" />
              Kaisen Coffee
            </Link>
            <p className="mt-4 max-w-xs text-sm text-cream/70">{BRAND.description}</p>

            <div className="mt-6 flex items-center gap-2">
              <IconPill href={BRAND.contact.instagramUrl} label="Instagram Kaisen Coffee">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </IconPill>
              <IconPill href={BRAND.contact.whatsappUrl} label="WhatsApp Kaisen Coffee">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </IconPill>
              <IconPill href={`mailto:${BRAND.contact.email}`} label="Email Kaisen Coffee">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </IconPill>
            </div>

            <div className="mt-6 space-y-2 text-sm text-cream/65">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                {BRAND.contact.whatsapp}
                <span className="text-cream/40">·</span>
                <span className="text-xs uppercase tracking-wider text-cream/40">placeholder</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
                {BRAND.contact.email}
              </p>
            </div>
          </div>

          {COLUMNS.map((c) => (
            <ColumnBlock key={c.title} column={c} />
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h3 className="font-display text-xl text-cream">Le cercle Kaisen</h3>
              <p className="mt-1 text-sm text-cream/70">
                Nouveaux cafés, conseils de préparation, offres privées. Une lettre par mois.
              </p>
            </div>
            <form onSubmit={onSubscribe} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <label htmlFor="footer-email" className="sr-only">
                Votre adresse e-mail
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-caramel px-5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#8f5934] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {subscribed ? 'Merci ✦' : 'S\'inscrire'}
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        {/* Trust row */}
        <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div className="flex items-center gap-3 text-sm text-cream/70">
            <Truck className="h-5 w-5 text-gold" aria-hidden="true" />
            Livraison offerte dès 4 000 G
          </div>
          <div className="flex items-center gap-3 text-sm text-cream/70">
            <ShieldCheck className="h-5 w-5 text-gold" aria-hidden="true" />
            Paiement sécurisé
          </div>
          <div className="flex items-center gap-3 text-sm text-cream/70">
            <MessageCircle className="h-5 w-5 text-gold" aria-hidden="true" />
            Support WhatsApp
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} Kaisen Coffee — Coordonnées de démonstration à remplacer.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-wide text-cream/60">
            <span className="rounded-md border border-white/12 px-2 py-1">VISA</span>
            <span className="rounded-md border border-white/12 px-2 py-1">MASTERCARD</span>
            <span className="rounded-md border border-white/12 px-2 py-1">MONCASH</span>
            <span className="rounded-md border border-white/12 px-2 py-1">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}