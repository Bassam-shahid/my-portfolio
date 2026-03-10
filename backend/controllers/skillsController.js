import { getSupabaseServiceClient } from '../services/supabase.js';

/**
 * Get all skills
 * GET /api/skills
 */
export async function getSkills(req, res) {
  try {
    const supabase = getSupabaseServiceClient();
    console.log('Fetching skills from Supabase...');
    
    // Try 'skills' first, fallback to 'skill' if table doesn't exist
    let { data: skills, error } = await supabase
      .from('skills')
      .select('*');
    
    // If 'skills' table doesn't exist, try singular 'skill'
    if (error && error.code === 'PGRST205') {
      console.log('Table "skills" not found, trying "skill"...');
      const result = await supabase
        .from('skill')
        .select('*');
      skills = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Supabase query error:', error.message);
      return res.status(500).json({
        error: 'Failed to fetch skills. Please try again later.'
      });
    }

    // Group skills by category
    const skillsByCategory = {};
    (skills || []).forEach(skill => {
      const category = skill.category || 'Other';
      if (!skillsByCategory[category]) {
        skillsByCategory[category] = [];
      }
      skillsByCategory[category].push(skill);
    });

    console.log(`✓ Successfully fetched ${skills?.length || 0} skills`);
    res.status(200).json(skillsByCategory);

  } catch (err) {
    console.error('Unexpected error in getSkills:', err.message);
    res.status(500).json({
      error: 'Failed to fetch skills. Please try again later.'
    });
  }
}

export default { getSkills };
