import Link from 'next/link';
import Logo from '@/components/landing/logo';

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <main
      className="relative min-h-screen flex items-center justify-center px-5 py-12 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[400px]">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Logo size="lg" href={undefined} />
          </Link>
        </div>

        <div
          className="rounded-[20px] p-10 sm:p-11"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--hairline)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          }}
        >
          <h1 className="display-heading text-[26px] text-center">{title}</h1>
          {subtitle && (
            <p
              className="mt-2 text-[14px] text-center"
              style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}
            >
              {subtitle}
            </p>
          )}

          <div className="mt-7">{children}</div>
        </div>

        {footer && (
          <div className="mt-6 text-center text-[13px]" style={{ color: 'var(--text-secondary)' }}>
            {footer}
          </div>
        )}
      </div>
    </main>
  );
}
