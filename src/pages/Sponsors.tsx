import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

interface Sponsor {
  name: string;
  image: string;
}

const IMAGE_A = '/sponsors/placeholder-a.svg';
const IMAGE_B = '/sponsors/placeholder-b.svg';

const sponsors: Sponsor[] = [
  { name: 'Sponsor', image: IMAGE_A },
  { name: 'Sponsor', image: IMAGE_B },
  { name: 'Sponsor', image: IMAGE_A },
  { name: 'Sponsor', image: IMAGE_B },
  { name: 'Sponsor', image: IMAGE_A },
  { name: 'Sponsor', image: IMAGE_B },
];

const SponsorCard: React.FC<{ sponsor: Sponsor; index: number }> = ({
  sponsor,
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
      className="card overflow-hidden"
    >
      <div className="aspect-[16/9] bg-slate-900">
        <img
          src={sponsor.image}
          alt={`${sponsor.name} placeholder`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h4 className="text-xl font-semibold">{sponsor.name}</h4>
        <p className="text-gray-400 mt-2">Placeholder — logo coming soon</p>
      </div>
    </motion.article>
  );
};

const Sponsors: React.FC = () => {
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
            <h1 className="mb-6">Sponsors</h1>
            <p className="text-xl text-gray-300">
              Thank you to the partners who support Startup Link Melbourne.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors.map((sponsor, index) => (
              <SponsorCard
                key={`${sponsor.image}-${index}`}
                sponsor={sponsor}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sponsors;
