import { NextResponse } from 'next/server'

export async function GET() {
  const consumerKey = process.env.KCB_BUNI_CONSUMER_KEY
  const consumerSecret = process.env.KCB_BUNI_CONSUMER_SECRET

  if (!consumerKey || !consumerSecret) {
    return NextResponse.json({ error: 'Missing KCB credentials' }, { status: 500 })
  }

  // Combine and Base64 encode the credentials
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')

  try {
    // Using sandbox URL. Change to 'https://uat.buni.kcbgroup.com/token' when going live
    const response = await fetch('https://sandbox.buni.kcbgroup.com/token?grant_type=client_credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials',
    })

    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to get token', details: data }, { status: response.status })
    }

    return NextResponse.json({ accessToken: data.access_token })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
