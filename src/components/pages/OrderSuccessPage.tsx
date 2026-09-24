import { useEffect, useState } from 'react';
import { CheckCircle2, Home, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/lib/config';
import { formatPrice } from '@/lib/format';
import type { OrderSummary } from '@/types';

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    document.title = 'Commande confirmée — Kaisen Coffee';
    try {
      const raw = sessionStorage.getItem('kaisen.lastOrder');
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h1 className="mt-6 font-display text-3xl sm:text-4xl">Merci pour votre commande.</h1>
        <p className="mt-3 text-sm text-espresso/70">
          Un e-mail de confirmation vous sera envoyé. Nous préparons votre commande avec soin.
        </p>

        {order && (
          <div className="mt-8 rounded-2xl border border-espresso/10 bg-warm-white/80 p-6 text-left backdrop-blur-xl">
            <dl className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-espresso/60">Numéro</dt>
                <dd className="font-medium text-espresso">{order.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-espresso/60">Date</dt>
                <dd className="font-medium text-espresso">
                  {new Date(order.createdAt).toLocaleString('fr-FR')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-espresso/60">Articles</dt>
                <dd className="font-medium text-espresso">
                  {order.lines.reduce((s, l) => s + l.quantity, 0)}
                </dd>
              </div>
              <div className="mt-3 flex items-baseline justify-between border-t border-espresso/10 pt-3">
                <dt className="font-display text-base font-bold text-espresso">Total</dt>
                <dd className="font-display text-xl font-bold text-espresso">
                  {formatPrice(order.total)}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="primary" size="lg" leftIcon={<Home className="h-4 w-4" aria-hidden="true" />}>
            Retour à l'accueil
          </Button>
          <Button
            href={BRAND.contact.whatsappUrl}
            variant="outline"
            size="lg"
            leftIcon={<MessageCircle className="h-4 w-4" aria-hidden="true" />}
          >
            Nous contacter
          </Button>
        </div>

        <p className="mt-8 text-xs text-espresso/50">
          Une question ? Écrivez-nous à{' '}
          <a href={`mailto:${BRAND.contact.email}`} className="text-caramel hover:underline">
            {BRAND.contact.email}
          </a>{' '}
          <span className="text-espresso/40">(placeholder)</span>
        </p>
      </div>
    </Container>
  );
}