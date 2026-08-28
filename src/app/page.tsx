import HeroSection    from '@/components/HeroSection';
import WorkSection    from '@/components/WorkSection';
import SpiralCarousel from '@/components/SpiralCarousel';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WorkSection />
      <section id="projects" className="pt-[clamp(4rem,10vh,7rem)]">
        <div className="max-w-[880px] px-6 lg:px-16">
          <div className="border-b border-border pb-6">
            <h2 className="text-feature font-semibold text-ink">Projects</h2>
            <p className="mt-3 max-w-[560px] text-sm leading-relaxed text-muted">
              Personal projects, hackathon builds, and experiments.
            </p>
          </div>
        </div>
      </section>
      <SpiralCarousel />
      <ContactSection />
    </>
  );
}
