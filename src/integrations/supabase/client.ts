import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://htzapqbpojigdfmarmcy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0emFwcWJwb2ppZ2RmbWFybWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1ODIzNTYsImV4cCI6MjA2MTE1ODM1Nn0.Ec6MBk3iu1VcQp_9ARVwpKERbeM6Bcp_JQN1FfhUuLM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)