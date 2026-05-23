import { listProfiles } from '@/profiles';
import TopNav from '@/components/landing/top-nav';
import Hero from '@/components/landing/hero';
import ProductShowcase from '@/components/landing/product-showcase';
import StatsGrid from '@/components/landing/stats-grid';
import ClaimSection from '@/components/landing/claim-section';
import ProfileDirectory from '@/components/landing/profile-directory';
import Pricing from '@/components/landing/pricing';
import FAQ from '@/components/landing/faq';
import CtaBanner from '@/components/landing/cta-banner';
import SiteFooter from '@/components/landing/site-footer';

export default function Home() {
  const profiles = listProfiles();

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Global page atmosphere */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(255,0,51,0.1) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(139,0,0,0.08) 0%, transparent 50%), #08080a',
          }}
        />
      </div>

      <div className="relative z-10">
        <TopNav />
        <Hero />
        <ProductShowcase profiles={profiles} />
        <StatsGrid />
        <ClaimSection />
        <ProfileDirectory profiles={profiles} />
        <Pricing />
        <FAQ />
        <CtaBanner />
        <SiteFooter />
      </div>
    </main>
  );
}
