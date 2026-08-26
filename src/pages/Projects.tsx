import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

interface Project {
  name: string;
  logo: string;
  summary: string;
}

interface ProjectTerm {
  year: number;
  semester: 1 | 2;
  isCurrent?: boolean;
  projects: [Project, Project];
}

const LOGO_A = '/projects/logo-a.svg';
const LOGO_B = '/projects/logo-b.svg';

const placeholderProject = (name: string, logo: string): Project => ({
  name,
  logo,
  summary: 'Placeholder — project and company details coming soon.',
});

const projectTerms: ProjectTerm[] = [
  {
    year: 2026,
    semester: 2,
    isCurrent: true,
    projects: [
      placeholderProject('Partner company', LOGO_A),
      placeholderProject('Partner company', LOGO_B),
    ],
  },
  {
    year: 2026,
    semester: 1,
    projects: [
      placeholderProject('Partner company', LOGO_A),
      placeholderProject('Partner company', LOGO_B),
    ],
  },
  {
    year: 2025,
    semester: 2,
    projects: [
      placeholderProject('Partner company', LOGO_A),
      placeholderProject('Partner company', LOGO_B),
    ],
  },
  {
    year: 2025,
    semester: 1,
    projects: [
      placeholderProject('Partner company', LOGO_A),
      placeholderProject('Partner company', LOGO_B),
    ],
  },
];

const years = [...new Set(projectTerms.map((term) => term.year))];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
  index,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card p-6 flex flex-col items-center text-center"
    >
      <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
        <img
          src={project.logo}
          alt={`${project.name} logo placeholder`}
          className="w-full h-full object-cover"
        />
      </div>
      <h4 className="text-xl font-semibold mt-5">{project.name}</h4>
      <p className="text-gray-400 mt-2">{project.summary}</p>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <main className="pt-28">
      <section className="section pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="mb-6">Projects</h1>
            <p className="text-xl text-gray-300">
              Two industry projects each semester, from the current team back to
              2025.
            </p>
          </motion.div>

          <div className="space-y-20">
            {years.map((year) => {
              const terms = projectTerms.filter((term) => term.year === year);

              return (
                <section key={year} aria-labelledby={`projects-${year}`}>
                  <h2 id={`projects-${year}`} className="mb-10">
                    {year}
                  </h2>
                  <div className="space-y-12">
                    {terms.map((term) => (
                      <div key={`${term.year}-s${term.semester}`}>
                        <div className="flex items-center gap-3 mb-6">
                          <h3 className="text-2xl">
                            Semester {term.semester}
                          </h3>
                          {term.isCurrent && (
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-3 py-1 text-sm font-medium rounded-md">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {term.projects.map((project, index) => (
                            <ProjectCard
                              key={`${term.year}-s${term.semester}-${index}`}
                              project={project}
                              index={index}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
