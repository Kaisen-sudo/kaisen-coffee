import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Package, Settings, User } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { useWishlist } from '@/store/WishlistContext';
import { useCart } from '@/store/CartContext';

const TILES = [
  { to: '/account/orders', label: 'Mes commandes', icon: Package, desc: 'Suivi, historique, factures' },
  { to: '/wishlist', label: 'Favoris', icon: Heart, desc: 'Cafés enregistrés' },
  { to: '/contact', label: 'Adresses', icon: MapPin, desc: 'Livraison & facturation' },
  { to: '/account', label: 'Préférences', icon: Settings, desc: 'Notifications, langue, e-mail' },
];

export default function AccountPage() {
  const { count } = useWishlist();
  const { itemCount } = useCart();

  useEffect(() => {
    document.title = 'Mon compte — Kaisen Coffee';
  }, []);

  return (
    <Container className="py-10 sm:py-14">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-caramel">Compte</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Bonjour.</h1>
        <p className="mt-2 max-w-xl text-sm text-espresso/65">
          Retrouvez vos commandes, vos favoris et vos préférences en un seul endroit.
        </p>
      </header>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {TILES.map(({ to, label, icon: Icon, desc }) => (
            <Link
              key={label}
              to={to}
              className="group rounded-2xl border border-espresso/10 bg-warm-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-caramel/30 hover:shadow-deep"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-caramel/12 text-caramel">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-espresso">{label}</h2>
              <p className="mt-1 text-sm text-espresso/65">{desc}</p>
            </Link>
          ))}
        </div>

        <aside className="rounded-2xl border border-espresso/10 bg-warm-white/70 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-espresso text-cream">
              <User className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-espresso">Invité·e</p>
              <p className="text-xs text-espresso/55">Démo — aucune session réelle</p>
            </div>
          </div>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-espresso/60">Panier</dt>
              <dd className="font-medium text-espresso">{itemCount} article{itemCount !== 1 ? 's' : ''}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-espresso/60">Favoris</dt>
              <dd className="font-medium text-espresso">{count}</dd>
            </div>
          </dl>

          <p className="mt-6 text-xs text-espresso/50">
            L'authentification n'est pas branchée dans cette démo. Connectez votre backend pour
            activer la persistance des comptes.
          </p>
        </aside>
      </div>
    </Container>
  );
}