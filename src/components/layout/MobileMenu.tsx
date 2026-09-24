import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Instagram, Mail, Phone, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { BRAND } from '@/lib/config';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useUI } from '@/store/UIContext';
import { Button } from '@/components/ui/Button';

const NAV = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/shop', label: 'Boutique' },
  { to: '/shop/origines', label: 'Cafés' },
  { to: '/shop/accessoires', label: 'Accessoires' },
  { to: '/subscription', label: 'Abonnement' },
  { to: '/about', label: 'À propos' },
  { to: '/blog', label: 'Journal' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export function MobileMenu() {
  const { mobileMenuOpen, closeMobileMenu } = useUI();
  useLockBodyScroll(mobileMenuOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    if (mobileMenuOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen, closeMobileMenu]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[70] lg:hidden',
        mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!mobileMenuOpen}
    >
      <div
        className={cn(
          'absolute inset-0 bg-espresso/50 backdrop-blur-sm transition-opacity duration-300',
          mobileMenuOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={closeMobileMenu}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
        className={cn(
          'absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-cream shadow-deep transition-transform duration-400 ease-premium',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-espresso/10 px-5 py-4">
          <span className="font-display text-lg font-black text-espresso">Kaisen Coffee</span>
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Fermer le menu"
            className="grid h-10 w-10 place-items-center rounded-full text-espresso transition-colors hover:bg-espresso/8"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors',
                      isActive
                        ? 'bg-caramel/12 text-caramel'
                        : 'text-espresso hover:bg-espresso/5',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-[15px] font-medium text-espresso hover:bg-espresso/5"
              >
                <Heart className="h-4 w-4" aria-hidden="true" /> Favoris
              </Link>
            </li>
          </ul>
        </nav>

        <div className="border-t border-espresso/10 px-5 py-5">
          <div className="mb-4 space-y-2 text-sm text-espresso/70">
            <a href={`mailto:${BRAND.contact.email}`} className="flex items-center gap-2 hover:text-caramel">
              <Mail className="h-4 w-4" aria-hidden="true" /> {BRAND.contact.email}
            </a>
            <a href={BRAND.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-caramel">
              <Phone className="h-4 w-4" aria-hidden="true" /> {BRAND.contact.whatsapp}
            </a>
            <a href={BRAND.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-caramel">
              <Instagram className="h-4 w-4" aria-hidden="true" /> {BRAND.contact.instagram}
            </a>
          </div>
          <Button to="/shop" variant="primary" fullWidth onClick={closeMobileMenu}>
            Découvrir la boutique
          </Button>
        </div>
      </aside>
    </div>
  );
}