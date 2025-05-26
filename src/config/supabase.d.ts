declare module './supabase.js' {
    import { SupabaseClient } from '@supabase/supabase-js';
    const supabase: SupabaseClient; // Use the SupabaseClient type from the library
    export default supabase;
}