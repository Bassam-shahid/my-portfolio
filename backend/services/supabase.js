import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('ERROR: Missing environment variables:', missingVars.join(', '));
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

// Singleton Supabase client instances
let supabaseClient = null;
let supabaseServiceClient = null;

/**
 * Get or create the Supabase client instance (anon key - public operations)
 */
export function getSupabaseClient() {
  if (!supabaseClient) {
    console.log('Initializing Supabase client...');
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
    console.log('SUPABASE_ANON_KEY length:', process.env.SUPABASE_ANON_KEY?.length);

    supabaseClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        },
        global: {
          fetch: async (url, options = {}) => {
            // Add retry logic for transient network errors
            const maxRetries = 3;
            const retryDelay = 1000; // 1 second
            
            for (let i = 0; i < maxRetries; i++) {
              try {
                return await fetch(url, {
                  ...options,
                  // Add timeout
                  signal: AbortSignal.timeout(10000) // 10 second timeout
                });
              } catch (error) {
                // Retry on network errors (EAI_AGAIN, ETIMEDOUT, etc.)
                if (i < maxRetries - 1 && (error.code === 'EAI_AGAIN' || error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET')) {
                  console.log(`Retrying Supabase request (${i + 1}/${maxRetries})...`);
                  await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
                } else {
                  throw error;
                }
              }
            }
          }
        }
      }
    );

    console.log('✓ Supabase client initialized');
  }
  return supabaseClient;
}

/**
 * Get Supabase client with service role (privileged operations)
 */
export function getSupabaseServiceClient() {
  if (!supabaseServiceClient) {
    console.log('Initializing Supabase service client...');
    console.log('SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length);

    supabaseServiceClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        },
        global: {
          fetch: async (url, options = {}) => {
            // Add retry logic for transient network errors
            const maxRetries = 3;
            const retryDelay = 1000; // 1 second
            
            for (let i = 0; i < maxRetries; i++) {
              try {
                return await fetch(url, {
                  ...options,
                  // Add timeout
                  signal: AbortSignal.timeout(10000) // 10 second timeout
                });
              } catch (error) {
                // Retry on network errors (EAI_AGAIN, ETIMEDOUT, etc.)
                if (i < maxRetries - 1 && (error.code === 'EAI_AGAIN' || error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET')) {
                  console.log(`Retrying Supabase request (${i + 1}/${maxRetries})...`);
                  await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
                } else {
                  throw error;
                }
              }
            }
          }
        }
      }
    );

    console.log('✓ Supabase service client initialized');
  }
  return supabaseServiceClient;
}

export default { getSupabaseClient, getSupabaseServiceClient };
