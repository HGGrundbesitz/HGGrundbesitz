import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import InvestmentProfile from '../../components/InvestmentProfile';
import Services from '../../components/Services';
import Process from '../../components/Process';
import Carousel from '../../components/Carousel';
import FAQ from '../../components/FAQ';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import Chatbot from '../../components/Chatbot';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-stone-200 font-sans selection:bg-gold/30 selection:text-white">
      <Navbar />
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="profile">
        <InvestmentProfile />
      </div>
      <div id="companies">
        <Services />
      </div>
      <Process />
      <div id="references">
        <Carousel />
      </div>
      <FAQ />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
