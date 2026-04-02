import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import InvestmentProfile from '../../components/InvestmentProfile';
import Services from '../../components/Services';
import Process from '../../components/Process';
import FAQ from '../../components/FAQ';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-gold/20 selection:text-stone-950 dark:bg-[#050505] dark:text-stone-100 dark:selection:text-white">
      <Navbar />
      <Hero />
      <ScrollToTop />
      <div id="about">
        <About />
      </div>
      <div id="profile">
        <InvestmentProfile />
      </div>
      <Services />
      <Process />
      <FAQ />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
