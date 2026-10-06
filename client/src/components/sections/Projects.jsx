import { useCallback, useState } from 'react';

import { ProjectCard } from '../ProjectCard';
import { ProjectModal } from '../ProjectModal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { projects } from '../../data/projects';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <Section id="projects" labelledBy="projects-heading" surface="paper" reveal>
      <div className="max-w-3xl">
        <SectionHeading
          id="projects-heading"
          eyebrow="Selected Engineering Work"
          heading="Featured Projects"
          lede="Production-grade builds spanning real-time environmental monitoring, emergency response systems, and full-stack platforms."
        />
      </div>

      {/* Two-column desktop grid matching the design reference */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      {/* Interactive Project Details Modal */}
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </Section>
  );
}

export default Projects;