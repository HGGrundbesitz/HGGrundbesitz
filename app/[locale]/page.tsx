import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import InvestmentProfile from '../../components/InvestmentProfile';
import Services from '../../components/Services';
import Process from '../../components/Process';
import FAQ from '../../components/FAQ';
import Contact from '../../components/Contact';
import QuickCheck from '../../components/QuickCheck';
import Footer from '../../components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const SectionDivider = () => (
  <div
    aria-hidden="true"
    className="mx-auto h-px w-24 max-w-[18vw] rounded-full bg-gradient-to-r from-transparent via-[#1C6AA8]/45 to-transparent"
  />
);

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-gold/20 selection:text-stone-950 dark:bg-[#050505] dark:text-stone-100 dark:selection:text-white">
      <Navbar />
      <Hero />
      <ScrollToTop />
      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#f6fafe_36%,#f7fbff_100%)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(176,208,236,0.18),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(217,234,251,0.3),transparent_28%),radial-gradient(circle_at_50%_78%,rgba(237,245,252,0.58),transparent_32%)]" />
        </div>
        <QuickCheck />
        <SectionDivider />
        <About />
        <SectionDivider />
        <InvestmentProfile />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}



