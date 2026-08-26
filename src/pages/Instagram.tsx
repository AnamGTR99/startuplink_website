import React, { useEffect, useState } from 'react';
import { ExternalLink, Images, Instagram as InstagramIcon, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import {
  fetchInstagramFeed,
  INSTAGRAM_PROFILE_URL,
  INSTAGRAM_USERNAME,
  type InstagramFeed,
  type InstagramPost,
} from '../lib/instagram';

const formatDate = (timestamp: string) =>
  new Date(timestamp).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const previewCaption = (caption: string) => {
  const text = caption.replace(/\s+/g, ' ').trim();
  if (text.length <= 140) return text;
  return `${text.slice(0, 137).trimEnd()}…`;
};

const PostCard: React.FC<{ post: InstagramPost; index: number }> = ({ post, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = post.thumbnailUrl || post.mediaUrl;

  return (
    <motion.a
      ref={ref}
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card group block"
    >
      <div className="relative overflow-hidden h-72 bg-slate-900">
        {imageSrc && !imageFailed ? (
          <img
            src={imageSrc}
            alt={previewCaption(post.caption) || 'Instagram post'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <InstagramIcon size={40} />
          </div>
        )}
        {post.mediaType === 'VIDEO' && (
          <div className="absolute top-3 right-3 bg-gray-900/80 text-white p-2 rounded-full">
            <Play size={14} />
          </div>
        )}
        {post.mediaType === 'CAROUSEL_ALBUM' && (
          <div className="absolute top-3 right-3 bg-gray-900/80 text-white p-2 rounded-full">
            <Images size={14} />
          </div>
        )}
      </div>
      <div className="p-5">
        {post.timestamp && (
          <p className="text-sm text-gray-500 mb-2">{formatDate(post.timestamp)}</p>
        )}
        <p className="text-gray-300 min-h-16">
          {previewCaption(post.caption) || 'View this post on Instagram'}
        </p>
        <span className="mt-4 inline-flex items-center text-cyan-400 group-hover:text-cyan-300">
          Open on Instagram <ExternalLink size={16} className="ml-2" />
        </span>
      </div>
    </motion.a>
  );
};

const LiveEmbed: React.FC = () => (
  <div className="glass-panel overflow-hidden">
    <iframe
      title={`@${INSTAGRAM_USERNAME} on Instagram`}
      src={`${INSTAGRAM_PROFILE_URL}embed`}
      className="w-full h-[960px] bg-black"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
);

const Instagram: React.FC = () => {
  const [feed, setFeed] = useState<InstagramFeed | null>(null);
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    let cancelled = false;

    fetchInstagramFeed().then((data) => {
      if (!cancelled) setFeed(data);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const posts = feed?.posts ?? [];
  const showEmbed = !feed || posts.length === 0;

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
            <h1 className="mb-6">Instagram</h1>
            <p className="text-xl text-gray-300 mb-8">
              Latest from @{feed?.username || INSTAGRAM_USERNAME} — events, members, and
              campus life as they happen.
            </p>
            <a
              href={feed?.profileUrl || INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <InstagramIcon size={18} className="mr-2" />
              Follow @{feed?.username || INSTAGRAM_USERNAME}
            </a>
          </motion.div>

          {!feed && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="card overflow-hidden">
                  <div className="h-72 bg-white/5 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-24 bg-white/5 animate-pulse rounded" />
                    <div className="h-16 bg-white/5 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {feed && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}

          {showEmbed && feed && (
            <div className="max-w-xl mx-auto">
              {feed.source === 'error' && (
                <p className="text-center text-gray-400 mb-8">
                  The gallery could not be loaded, so here is the live Instagram feed instead.
                </p>
              )}
              <LiveEmbed />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Instagram;
