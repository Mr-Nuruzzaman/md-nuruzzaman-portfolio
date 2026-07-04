import { Hero } from '@/components/sections/Hero';
import { TrustMarquee } from '@/components/sections/TrustMarquee';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { CompetitiveProgramming } from '@/components/sections/CompetitiveProgramming';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Hero />
      <TrustMarquee />
      <About />
      <Experience />
      <Projects />
      <CompetitiveProgramming />
      <Skills />
      <Contact />
    </main>
  );
}
