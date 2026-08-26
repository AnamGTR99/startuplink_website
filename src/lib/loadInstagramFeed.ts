import {
  emptyInstagramFeed,
  INSTAGRAM_USERNAME,
  type InstagramFeed,
  type InstagramMediaType,
  type InstagramPost,
} from './instagram';

const MEDIA_FIELDS =
  'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';

interface GraphMedia {
  id: string;
  caption?: string;
  media_type: InstagramMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

interface GraphProfile {
  username?: string;
  name?: string;
  profile_picture_url?: string;
  followers_count?: number;
  media_count?: number;
}

export async function loadInstagramFeed(token?: string): Promise<InstagramFeed> {
  if (!token) {
    return emptyInstagramFeed();
  }

  try {
    const mediaUrl = new URL('https://graph.instagram.com/me/media');
    mediaUrl.searchParams.set('fields', MEDIA_FIELDS);
    mediaUrl.searchParams.set('limit', '24');
    mediaUrl.searchParams.set('access_token', token);

    const mediaResponse = await fetch(mediaUrl);
    const mediaJson = (await mediaResponse.json()) as {
      data?: GraphMedia[];
    };

    if (!mediaResponse.ok || !Array.isArray(mediaJson.data)) {
      return emptyInstagramFeed({
        source: 'error',
        error: 'Instagram API request failed',
      });
    }

    const posts: InstagramPost[] = mediaJson.data.map((item) => ({
      id: item.id,
      caption: item.caption ?? '',
      mediaType: item.media_type,
      mediaUrl: item.media_url,
      thumbnailUrl: item.thumbnail_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));

    const profile = await loadProfile(token);

    return {
      ...emptyInstagramFeed(),
      ...profile,
      posts,
      source: 'graph',
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return emptyInstagramFeed({
      source: 'error',
      error: 'Instagram API request failed',
    });
  }
}

async function loadProfile(token: string): Promise<Partial<InstagramFeed>> {
  try {
    const meUrl = new URL('https://graph.instagram.com/me');
    meUrl.searchParams.set(
      'fields',
      'username,name,profile_picture_url,followers_count,media_count'
    );
    meUrl.searchParams.set('access_token', token);

    const response = await fetch(meUrl);
    if (!response.ok) return {};

    const profile = (await response.json()) as GraphProfile;
    const username = profile.username ?? INSTAGRAM_USERNAME;

    return {
      username,
      profileUrl: `https://www.instagram.com/${username}/`,
      name: profile.name,
      profilePictureUrl: profile.profile_picture_url,
      followersCount: profile.followers_count,
      mediaCount: profile.media_count,
    };
  } catch {
    return {};
  }
}
