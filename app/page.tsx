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
      {/* Pure black canvas */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none" style={{ background: '#000000' }} />

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
