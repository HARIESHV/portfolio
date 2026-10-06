import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Journey } from './components/sections/Journey';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />

      {/* First tab stop on the page. */}
      <a href="#main" className="sr-only-focusable">
        Skip to main content
      </a>

      <Navbar />

      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Journey />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
