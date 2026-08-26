import { writeFileSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';
import { loadInstagramFeed } from './src/lib/loadInstagramFeed';

const CACHE_MS = 5 * 60 * 1000;

export function instagramApiPlugin(token?: string): Plugin {
  let cached: { at: number; body: string } | null = null;

  const getBody = async () => {
    if (cached && Date.now() - cached.at < CACHE_MS) {
      return cached.body;
    }

    const feed = await loadInstagramFeed(token);
    const body = JSON.stringify(feed);
    cached = { at: Date.now(), body };
    return body;
  };

  return {
    name: 'instagram-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/api/instagram' && url !== '/instagram-feed.json') {
          next();
          return;
        }

        const body = await getBody();
        res.setHeader('Content-Type', 'application/json');
        res.end(body);
      });
    },
    async writeBundle(options) {
      const dir = options.dir ?? resolve('dist');
      writeFileSync(resolve(dir, 'instagram-feed.json'), await getBody());
      copyFileSync(resolve(dir, 'index.html'), resolve(dir, '404.html'));
    },
  };
}
