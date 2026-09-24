import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/cn';
import { useCart } from '@/store/CartContext';
import { useWishlist } from '@/store/WishlistContext';
import { useUI } from '@/store/UIContext';

const NAV = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/shop', label: 'Boutique' },
  { to: '/shop/origines', label: 'Cafés' },
  { to: '/subscription', label: 'Abonnement' },
  { to: '/about', label: 'À propos' },
  { to: '/blog', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { openCart, openSearch, openMobileMenu } = useUI();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparent = isHome && !scrolled;
  const solid = !transparent;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium',
        solid ? 'glass-nav shadow-[0_1px_0_rgba(36,26,22,0.06)]' : 'border-b border-transparent',
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-3 sm:h-18">
          <Link
            to="/"
            aria-label="Kaisen Coffee — accueil"
            className={cn(
              'flex shrink-0 items-center gap-2 font-display text-lg font-black tracking-tight transition-colors duration-500',
              solid ? 'text-espresso' : 'text-cream',
            )}
          >
            <span className="h-2 w-2 rounded-full bg-caramel" aria-hidden="true" />
            Kaisen Coffee
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        'relative text-sm font-medium transition-colors',
                        solid
                          ? isActive
                            ? 'text-caramel'
                            : 'text-espresso/80 hover:text-espresso'
                          : isActive
                            ? 'text-gold'
                            : 'text-cream/85 hover:text-cream',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <IconButton
              label="Rechercher"
              onClick={openSearch}
              className={cn(solid ? 'text-espresso' : 'text-cream hover:bg-white/15')}
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </IconButton>

            <Link
              to="/account"
              aria-label="Mon compte"
              className={cn(
                'hidden h-11 w-11 place-items-center rounded-full transition-colors sm:grid',
                solid ? 'text-espresso hover:bg-espresso/8' : 'text-cream hover:bg-white/15',
              )}
            >
              <User className="h-5 w-5" aria-hidden="true" />
            </Link>

            <Link
              to="/wishlist"
              aria-label={`Favoris${wishlistCount > 0 ? ` (${wishlistCount})` : ''}`}
              className={cn(
                'relative hidden h-11 w-11 place-items-center rounded-full transition-colors sm:grid',
                solid ? 'text-espresso hover:bg-espresso/8' : 'text-cream hover:bg-white/15',
              )}
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-caramel px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Panier${itemCount > 0 ? ` (${itemCount} article${itemCount > 1 ? 's' : ''})` : ''}`}
              className={cn(
                'relative grid h-11 w-11 place-items-center rounded-full transition-colors',
                solid ? 'text-espresso hover:bg-espresso/8' : 'text-cream hover:bg-white/15',
              )}
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-caramel px-1 text-[10px] font-bold text-white ring-2 ring-cream">
                  {itemCount}
                </span>
              )}
            </button>

            <IconButton
              label="Ouvrir le menu"
              onClick={openMobileMenu}
              className={cn('lg:hidden', solid ? 'text-espresso' : 'text-cream hover:bg-white/15')}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </IconButton>
          </div>
        </div>
      </Container>
    </header>
  );
}