import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-espresso/10 overflow-hidden rounded-2xl border border-espresso/10 bg-warm-white/70', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const headerId = `${baseId}-${item.id}-header`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id}>
            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-espresso/[0.03] focus-visible:outline-none focus-visible:bg-espresso/[0.05]"
            >
              <span className="text-[15px] font-medium text-espresso">{item.title}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  'h-4 w-4 shrink-0 text-espresso/60 transition-transform duration-300 ease-premium',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={cn(
                'grid overflow-hidden transition-all duration-300 ease-premium',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="min-h-0">
                <div className="px-5 pb-5 text-[15px] leading-relaxed text-espresso/75">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}