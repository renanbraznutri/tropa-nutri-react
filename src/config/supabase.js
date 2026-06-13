import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://naaiycyifdkqwbqllvrm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hYWl5Y3lpZmRrcXdibGxybyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzEyMzQ2MTAwLCJleHAiOjE4NzcxNTQ1MDB9.eD9mKPfnLb3xHexHVVxU7Z3P5n7pN1j4i8mFwQpZWBo'

export const supabase = createClient(supabaseUrl, supabaseKey)
