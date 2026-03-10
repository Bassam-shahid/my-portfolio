import { getSupabaseClient } from '../services/supabase.js';
import { sendContactNotification } from '../utils/email.js';
import { contactSchema } from '../utils/validation.js';

/**
 * Submit contact form
 * POST /api/contact
 */
export async function submitContact(req, res) {
  console.log('=== submitContact called ===');
  try {
    // Validate request body
    console.log('Validating request body...');
    const { error, value } = contactSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
      console.log('Validation failed:', error.message);
      const details = {};
      error.details.forEach(detail => {
        details[detail.path[0]] = detail.message;
      });
      
      return res.status(400).json({
        error: 'Validation failed',
        details
      });
    }
    console.log('Validation passed');

    const { name, email, message } = value;

    // Insert into Supabase contacts table (plural name)
    const supabase = getSupabaseClient();
    console.log('Inserting contact into Supabase...');

    const { data: contactData, error: insertError } = await supabase
      .from('contacts')
      .insert([{ name, email, message }])
      .select()
      .single();

    console.log('Insert result:', { contactData, insertError });

    if (insertError) {
      console.error('Database insert error:', {
        message: insertError.message,
        code: insertError.code,
        details: insertError.details,
        hint: insertError.hint
      });
      return res.status(500).json({
        error: 'Failed to submit contact form. Please try again later.',
        debug: {
          message: insertError.message,
          code: insertError.code
        }
      });
    }

    console.log('✓ Contact saved to database');

    // Send email notification (best effort - don't fail if email fails)
    // Skip email if EMAIL_PASS is not configured
    if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'your-gmail-app-password-here') {
      const emailResult = await sendContactNotification({ name, email, message });
      
      if (!emailResult.success) {
        console.warn('Email notification failed:', emailResult.error);
        // Continue with success response - contact was saved
      }
    } else {
      console.log('Email not configured, skipping notification (contact saved to DB)');
    }

    console.log('✓ Contact form submitted successfully');
    
    // Return success response
    res.status(201).json({
      success: true,
      message: "Thanks! I'll get back soon."
    });

  } catch (err) {
    console.error('Unexpected error in submitContact:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({
      error: 'Failed to submit contact form. Please try again later.'
    });
  }
}

export default { submitContact };
