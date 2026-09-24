import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ToastHost } from '@/components/ui/ToastHost';
import { BackgroundDecor } from '@/components/ui/BackgroundDecor';
import { useRevealObserver } from '@/hooks/useReveal';

export function Layout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  // Reveal-on-scroll, re-scans after each route change
  useRevealObserver();

  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundDecor />
      <Navbar />
      <main id="main" className="flex-1 pt-16 sm:pt-18">
        <Outlet />
      </main>
      <Footer />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <ToastHost />
    </div>
  );
}