import { Section } from '../ui/Section';
import { TimelineExplorer } from './TimelineExplorer';
import { educationItems } from './Education';
import { experienceItems } from './Experience';

const journeyItems = [...experienceItems, ...educationItems];

export function Journey() {
  return (
    <Section id="experience" labelledBy="journey-heading" surface="cream" reveal>
      <header className="max-w-[48rem]">
        <h2
          id="journey-heading"
          className="text-3xl font-bold uppercase leading-[1.2] tracking-[0.06em] text-[#292820] sm:text-4xl"
        >
          Education &amp; Experience
        </h2>
        <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-[#716B60] sm:text-[1.0625rem]">
          My academic journey and technical foundation.
        </p>
      </header>
      <TimelineExplorer id="journey" label="Education and experience entries" entries={journeyItems} />
    </Section>
  );
}

export default Journey;