import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes/AppRoutes';
import { CartProvider } from '@/store/CartContext';
import { WishlistProvider } from '@/store/WishlistContext';
import { UIProvider } from '@/store/UIContext';

export default function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <WishlistProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </WishlistProvider>
      </UIProvider>
    </BrowserRouter>
  );
}