import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useUI, type ToastVariant } from '@/store/UIContext';

const tones: Record<ToastVariant, string> = {
  success: 'bg-espresso text-cream border-white/10',
  error: 'bg-red-900 text-cream border-red-500/30',
  info: 'bg-coffee text-cream border-white/10',
};

const icons: Record<ToastVariant, JSX.Element> = {
  success: <CheckCircle2 className="h-5 w-5 text-gold" aria-hidden="true" />,
  error: <XCircle className="h-5 w-5 text-red-300" aria-hidden="true" />,
  info: <Info className="h-5 w-5 text-gold" aria-hidden="true" />,
};

export function ToastHost() {
  const { toasts, dismissToast } = useUI();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cn(
            'pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border px-4 py-3 shadow-deep backdrop-blur-xl',
            'animate-fade-up',
            tones[t.variant],
          )}
        >
          {icons[t.variant]}
          <p className="flex-1 text-sm font-medium">{t.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            aria-label="Fermer la notification"
            className="grid h-7 w-7 place-items-center rounded-full text-cream/70 transition-colors hover:bg-white/10 hover:text-cream"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}