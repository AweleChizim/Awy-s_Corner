import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function POST(request: Request) {
  const { email, name } = await request.json()

  const { error } = await supabase.from('subscribers').insert([{ email, name }])
  
  if (error) {
    console.error("Supabase Error:", error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 400 })
  }
  
  return NextResponse.json({ message: 'Welcome to Awy\'s Corner' }, { status: 200 })
}