
'use server';

import { createClient } from '@supabase/supabase-js';

// This is a server-side cache for the secrets to avoid fetching them on every single API call.
let cachedSecrets: { [key: string]: string } | null = null;
let lastFetchTimestamp = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // Cache secrets for 5 minutes

export async function getEkaSecrets(): Promise<{ EKA_API_KEY: string; EKA_CLIENT_ID: string; EKA_CLIENT_SECRET: string; } | null> {
    const now = Date.now();
    if (cachedSecrets && (now - lastFetchTimestamp < CACHE_DURATION_MS)) {
        console.log('Returning secrets from cache.');
        return cachedSecrets as any;
    }

    console.log('Fetching secrets from Supabase...');

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('FATAL: Supabase URL or Anon Key is not defined in environment variables.');
        throw new Error('Supabase configuration is missing.');
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        
        const { data, error } = await supabase
            .from('secrets')
            .select('name, value');

        if (error) {
            console.error('Supabase fetch error:', error);
            throw error;
        }

        if (!data) {
            console.error('No data returned from Supabase secrets table.');
            return null;
        }
        
        const secrets = data.reduce((acc, { name, value }) => {
            acc[name] = value;
            return acc;
        }, {} as { [key: string]: string });

        if (!secrets.EKA_API_KEY || !secrets.EKA_CLIENT_ID || !secrets.EKA_CLIENT_SECRET) {
             console.error('One or more Eka secrets are missing from the Supabase secrets table.');
             return null;
        }
        
        console.log('Successfully fetched secrets from Supabase.');
        cachedSecrets = secrets;
        lastFetchTimestamp = now;

        return secrets as any;
    } catch (err) {
        console.error('Failed to get secrets from Supabase:', err);
        // If we fail, we clear the cache so the next request tries again.
        cachedSecrets = null; 
        lastFetchTimestamp = 0;
        return null;
    }
}
