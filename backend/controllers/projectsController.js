import { getSupabaseServiceClient } from '../services/supabase.js';

/**
 * Get all projects
 * GET /api/projects
 */
export async function getProjects(req, res) {
  console.log('=== getProjects called ===');
  try {
    const supabase = getSupabaseServiceClient();
    console.log('Supabase client obtained');
    
    // Query from 'projects' table (plural)
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*');

    if (error) {
      console.error('Supabase query error:', JSON.stringify(error, null, 2));
      return res.status(500).json({
        error: 'Failed to fetch projects. Please try again later.',
        debug: {
          message: error.message,
          code: error.code
        }
      });
    }

    // Sort by created_at if column exists, otherwise return as-is
    let sortedProjects = projects || [];
    if (sortedProjects.length > 0 && 'created_at' in sortedProjects[0]) {
      sortedProjects = sortedProjects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      console.log(`✓ Successfully fetched ${sortedProjects.length} projects (sorted by created_at)`);
    } else {
      console.log(`✓ Successfully fetched ${sortedProjects.length} projects (no created_at column, unsorted)`);
    }
    
    res.status(200).json(sortedProjects);

  } catch (err) {
    console.error('Unexpected error in getProjects:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({
      error: 'Failed to fetch projects. Please try again later.'
    });
  }
}

export default { getProjects };
