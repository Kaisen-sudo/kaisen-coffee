import { useEffect, useState } from 'react';
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { BRAND } from '@/lib/config';
import { FAQ } from '@/data/faq';
import { useUI } from '@/store/UIContext';

export default function ContactPage() {
  const { pushToast } = useUI();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    document.title = 'Contact — Kaisen Coffee';
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pushToast('Message envoyé — merci ! (démo)', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const contactFaqs = FAQ.slice(0, 4).map((f) => ({
    id: f.id,
    title: f.question,
    content: f.answer,
  }));

  return (
    <Container className="py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Contact</p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">Parlons café.</h1>
        <p className="mt-4 text-sm text-espresso/65 sm:text-base">
          Une question sur une commande, un café, un abonnement ? Nous répondons sous 24 h.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
        <form onSubmit={onSubmit} className="rounded-2xl border border-espresso/10 bg-warm-white/70 p-6 backdrop-blur-xl sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Nom"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <Input
              label="Sujet"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <Textarea
              label="Message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              rightIcon={<Send className="h-4 w-4" aria-hidden="true" />}
            >
              Envoyer le message
            </Button>
          </div>
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-espresso/10 bg-warm-white/70 p-6 backdrop-blur-xl">
            <h2 className="font-display text-lg font-bold text-espresso">Coordonnées</h2>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-espresso/45">
              Placeholders — à remplacer
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                <a href={`mailto:${BRAND.contact.email}`} className="text-espresso/80 hover:text-caramel">
                  {BRAND.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                <a href={BRAND.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-espresso/80 hover:text-caramel">
                  {BRAND.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                <a href={BRAND.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-espresso/80 hover:text-caramel">
                  {BRAND.contact.instagram}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                <span className="text-espresso/80">{BRAND.contact.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                <span className="text-espresso/80">{BRAND.contact.hours}</span>
              </li>
            </ul>

            <Button
              href={BRAND.contact.whatsappUrl}
              variant="accent"
              fullWidth
              className="mt-5"
              leftIcon={<MessageCircle className="h-4 w-4" aria-hidden="true" />}
            >
              Discuter sur WhatsApp
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-espresso/10 bg-beige/60">
            <div className="grid aspect-[4/3] place-items-center bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center">
              <span className="rounded-full bg-espresso/70 px-4 py-2 text-xs font-medium text-cream backdrop-blur-xl">
                Plan à insérer
              </span>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl sm:text-3xl">Questions fréquentes</h2>
        <div className="mt-5 max-w-3xl">
          <Accordion items={contactFaqs} />
        </div>
      </section>
    </Container>
  );
}