import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qlterlkavzxidliounaa.supabase.co"
const supabaseAnonKey =process.env.REACT_APP_SUPABSE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)