export const INSTAGRAM_USERNAME = 'startuplinkunimelb';
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

export type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

export interface InstagramPost {
  id: string;
  caption: string;
  mediaType: InstagramMediaType;
  mediaUrl?: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp: string;
}

export interface InstagramFeed {
  username: string;
  profileUrl: string;
  name?: string;
  profilePictureUrl?: string;
  followersCount?: number;
  mediaCount?: number;
  posts: InstagramPost[];
  fetchedAt: string;
  source: 'graph' | 'unconfigured' | 'error';
  error?: string;
}

export function emptyInstagramFeed(partial?: Partial<InstagramFeed>): InstagramFeed {
  return {
    username: INSTAGRAM_USERNAME,
    profileUrl: INSTAGRAM_PROFILE_URL,
    posts: [],
    fetchedAt: new Date().toISOString(),
    source: 'unconfigured',
    ...partial,
  };
}

export async function fetchInstagramFeed(): Promise<InstagramFeed> {
  const endpoints = ['/api/instagram', '/instagram-feed.json'];

  for (const url of endpoints) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;

      const data = (await response.json()) as InstagramFeed;
      if (data && Array.isArray(data.posts)) {
        return data;
      }
    } catch {
      // Try the next endpoint (dev middleware, Vercel function, or static JSON).
    }
  }

  return emptyInstagramFeed({
    source: 'error',
    error: 'Could not reach the Instagram API',
  });
}
