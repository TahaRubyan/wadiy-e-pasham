/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Supabase Environment Credentials
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://demo-shawls-store.supabase.co';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
