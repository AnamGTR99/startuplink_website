import { loadInstagramFeed } from '../src/lib/loadInstagramFeed';

type JsonResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => { json: (body: unknown) => void };
};

export default async function handler(
  _request: unknown,
  response: JsonResponse
) {
  const feed = await loadInstagramFeed(process.env.INSTAGRAM_ACCESS_TOKEN);
  response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
  response.status(200).json(feed);
}
