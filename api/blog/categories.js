import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('category')
      .eq('is_published', true);

    if (error) throw error;

    const categories = Array.from(new Set(data?.map((p) => p.category) || []))
      .filter(Boolean)
      .sort();

    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    return res.status(200).json({ categories });
  } catch (err) {
    console.error('[blog/categories]', err);
    return res.status(500).json({ error: 'failed_to_fetch_categories' });
  }
}
