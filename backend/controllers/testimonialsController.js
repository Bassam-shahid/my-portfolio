import { getSupabaseServiceClient } from '../services/supabase.js';

/**
 * Get all testimonials
 * GET /api/testimonials
 */
export async function getTestimonials(req, res) {
  try {
    const supabase = getSupabaseServiceClient();
    console.log('Fetching testimonials from Supabase...');
    
    // Try 'testimonials' first, fallback to 'testimonial' if table doesn't exist
    let { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*');
    
    // If 'testimonials' table doesn't exist, try singular 'testimonial'
    if (error && error.code === 'PGRST205') {
      console.log('Table "testimonials" not found, trying "testimonial"...');
      const result = await supabase
        .from('testimonial')
        .select('*');
      testimonials = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Supabase query error:', error.message);
      return res.status(500).json({
        error: 'Failed to fetch testimonials. Please try again later.'
      });
    }

    console.log(`✓ Successfully fetched ${testimonials?.length || 0} testimonials`);
    res.status(200).json(testimonials || []);

  } catch (err) {
    console.error('Unexpected error in getTestimonials:', err.message);
    res.status(500).json({
      error: 'Failed to fetch testimonials. Please try again later.'
    });
  }
}

export default { getTestimonials };
