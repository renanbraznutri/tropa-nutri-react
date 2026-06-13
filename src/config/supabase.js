import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://naaiycyifdkqwbqllvrm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hYWl5Y3lpZmRrcXdicWxsdnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODQyNDMsImV4cCI6MjA5NjI2MDI0M30.RQAYqOOpvze7SuvVok3-Dm8Oz9T8XomtYONpn4_ufq8'

export const supabase = createClient(supabaseUrl, supabaseKey)
