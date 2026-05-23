import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function POST(request: Request) {
  const body = await request.json()
  
  // Only trigger on newly published posts
  if (body._type === 'post' && body.slug) {
    const { data: subscribers } = await supabase.from('subscribers').select('email')
    
    const emails = subscribers?.map(sub => sub.email) || []
    
    for (const email of emails) {
      await resend.emails.send({
        from: 'Awele <hello@awyscorner.com>',
        to: email,
        subject: `New on Awy's Corner: ${body.title}`,
        html: `<p>A new piece is up. Read it here: https://awyscorner.com/writings/${body.slug.current}</p>`
      })
    }
    return NextResponse.json({ message: 'Emails sent successfully' })
  }
  
  return NextResponse.json({ message: 'Ignored' })
}