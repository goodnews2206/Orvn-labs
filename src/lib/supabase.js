import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. See SUPABASE_SETUP.md');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to get all published posts with sorting
export async function getPublishedPosts(orderBy = 'published_at', limit = null) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order(orderBy, { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// Helper to get a single post by slug
export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
  return data || null;
}

// Helper to get posts by category
export async function getPostsByCategory(category, limit = null) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .eq('category', category)
    .order('published_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// Helper to get related posts
export async function getRelatedPosts(slug, category, limit = 3) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .eq('category', category)
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

// Helper to get all categories from published posts
export async function getAllCategories() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('category')
    .eq('is_published', true);

  if (error) throw error;
  const categories = [...new Set(data?.map((p) => p.category) || [])];
  return categories.sort();
}

// Upload image to storage
export async function uploadBlogImage(file, subfolder = '') {
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}-${file.name}`;
  const path = subfolder ? `${subfolder}/${filename}` : filename;

  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from('blog-images')
    .getPublicUrl(path);

  return publicUrl.publicUrl;
}

// Delete image from storage
export async function deleteBlogImage(imageUrl) {
  if (!imageUrl) return;

  const path = imageUrl.split('/blog-images/')[1];
  if (!path) return;

  const { error } = await supabase.storage
    .from('blog-images')
    .remove([path]);

  if (error) console.warn('Failed to delete image:', error);
}
