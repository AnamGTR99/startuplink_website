import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

interface CommitteeTerm {
  year: number;
  semester: 1 | 2;
  photo: string;
  isCurrent?: boolean;
}

const PLACEHOLDER = '/committee/placeholder.svg';

const committeeTerms: CommitteeTerm[] = [
  { year: 2026, semester: 2, photo: PLACEHOLDER, isCurrent: true },
  { year: 2026, semester: 1, photo: PLACEHOLDER },
  { year: 2025, semester: 2, photo: PLACEHOLDER },
  { year: 2025, semester: 1, photo: PLACEHOLDER },
];

const years = [...new Set(committeeTerms.map((term) => term.year))];

const CommitteePhoto: React.FC<{ term: CommitteeTerm; index: number }> = ({
  term,
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
      className="card"
    >
      <div className="relative overflow-hidden aspect-[16/9] bg-slate-900">
        <img
          src={term.photo}
          alt={`Startup Link Melbourne committee, Semester ${term.semester} ${term.year}`}
          className="w-full h-full object-cover"
        />
        {term.isCurrent && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-1.5 text-sm font-medium rounded-md">
            Current
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">
          Semester {term.semester} {term.year}
        </h3>
        <p className="text-gray-400 mt-2">Committee group photo</p>
      </div>
    </motion.article>
  );
};

const Committee: React.FC = () => {
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
            <h1 className="mb-6">Committee</h1>
            <p className="text-xl text-gray-300">
              One group photo for each semester of the Startup Link Melbourne
              committee, from the current team back to 2025.
            </p>
          </motion.div>

          <div className="space-y-20">
            {years.map((year) => {
              const terms = committeeTerms.filter((term) => term.year === year);

              return (
                <section key={year} aria-labelledby={`committee-${year}`}>
                  <h2 id={`committee-${year}`} className="mb-8">
                    {year}
                  </h2>
                  <div className="grid grid-cols-1 gap-8">
                    {terms.map((term, index) => (
                      <CommitteePhoto
                        key={`${term.year}-s${term.semester}`}
                        term={term}
                        index={index}
                      />
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

export default Committee;
