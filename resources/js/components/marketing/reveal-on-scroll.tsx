import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type RevealOnScrollProps = {
    children: ReactNode;
    className?: string;
    /** تأخير بسيط بعد ظهور العنصر (للتتابع بين العناصر) */
    delayMs?: number;
};

export function RevealOnScroll({ children, className, delayMs = 0 }: RevealOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true);
            return;
        }

        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.08, rootMargin: '0px 0px -28px 0px' },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={cn('marketing-reveal', visible && 'marketing-reveal-visible', className)}
            style={{ transitionDelay: visible ? `${delayMs}ms` : '0ms' }}
        >
            {children}
        </div>
    );
}
