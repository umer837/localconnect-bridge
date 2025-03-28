
import { createClient } from '@supabase/supabase-js';

// Use either environment variables or default to demo/test values
// In a production environment, you would properly set these values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcmFma3B1YW56YXhhdHB5YW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2NDQxNTcsImV4cCI6MjAyNzIyMDE1N30.example_key';

// Log a warning if using defaults rather than actual credentials
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Using demo Supabase credentials. This is for development only. Please set up proper environment variables for production.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
