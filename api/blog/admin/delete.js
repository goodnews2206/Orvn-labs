import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  // Auth check
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const token = authHeader.slice(7);

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: 'invalid_token' });
    }

    // Get the post first to get the image URL
    const { data: post, error: fetchError } = await supabase
      .from('blog_posts')
      .select('featured_image_url')
      .eq('slug', slug)
      .single();

    if (fetchError) throw fetchError;

    // Delete the post
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('slug', slug);

    if (deleteError) throw deleteError;

    // Delete the featured image if it exists
    if (post?.featured_image_url) {
      const imagePath = post.featured_image_url.split('/blog-images/')[1];
      if (imagePath) {
        await supabase.storage
          .from('blog-images')
          .remove([imagePath])
          .catch((err) => console.warn('Failed to delete image:', err));
      }
    }

    return res.status(200).json({ success: true, message: 'post_deleted' });
  } catch (err) {
    console.error('[blog/admin/delete]', err);
    return res.status(500).json({ error: 'failed_to_delete_post' });
  }
}
