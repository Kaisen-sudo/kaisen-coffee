import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Section } from '@/components/ui/Section';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail('');
    window.setTimeout(() => setDone(false), 2600);
  };

  return (
    <Section aria-labelledby="newsletter-title" className="bg-beige/60" reveal>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Newsletter</p>
        <h2 id="newsletter-title" className="mt-3 font-display text-3xl sm:text-4xl">
          Rejoignez le cercle Kaisen
        </h2>
        <p className="mt-3 text-sm text-espresso/65 sm:text-base">
          Nouveaux cafés, conseils de préparation, offres privées. Une lettre par mois, jamais plus.
        </p>

        <form onSubmit={onSubmit} className="mx-auto mt-6 flex w-full max-w-lg flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Votre adresse e-mail
          </label>
          <div className="flex flex-1 items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 backdrop-blur-xl">
            <Mail className="h-4 w-4 text-espresso/50" aria-hidden="true" />
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="h-12 w-full bg-transparent text-sm text-espresso placeholder:text-espresso/45 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-espresso px-6 text-sm font-medium text-cream transition-all duration-300 hover:bg-[#1a1210] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
          >
            {done ? 'Merci ✦' : 'S\'inscrire'}
          </button>
        </form>
      </div>
    </Section>
  );
}