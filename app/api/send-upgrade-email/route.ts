import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, name, tier } = await request.json();

    const tierDisplayName = tier === 'premium' ? 'Premium' : 'Verified';

    const { data, error } = await resend.emails.send({
      from: 'Ehani Homes <support@ehani.co.ke>', 
      to: [email],
      subject: `Welcome to Ehani ${tierDisplayName}! 🌟 (We’d love your feedback)`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1C1209; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <p style="font-size: 16px;">Hi ${name},</p>
          
          <p style="font-size: 16px;">Thank you for upgrading your property to the <strong>Ehani ${tierDisplayName}</strong> tier!</p>
          
          <p style="font-size: 16px;">Your payment has been successfully processed. Our field agents will be in touch shortly to schedule your physical inspection, and your listing will soon enjoy priority placement and direct tenant inquiries.</p>
          
          <div style="background-color: #FDF8F3; border-left: 4px solid #D4873A; padding: 16px; margin: 24px 0; border-radius: 4px;">
            <p style="margin: 0 0 8px 0; font-weight: 600; color: #1C1209;">We are constantly striving to improve the Ehani Homes experience.</p>
            <p style="margin: 0; font-size: 14px; color: #6B5B4E;">Would you mind taking 30 seconds to share your thoughts on the signup and payment process? Your feedback is completely optional but deeply appreciated, and it helps us build a better platform for you.</p>
          </div>

          <p style="text-align: center; margin: 32px 0;">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSc1yGf_2esZ6trmX3xQxwIPgc84enbUQ3ylmiy6BCZeO_dUPA/viewform" style="background-color: #D4873A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">Share Your Feedback</a>
          </p>
          
          <p style="font-size: 16px;">If you have any immediate questions, simply reply to this email. We are always here to help.</p>
          
          <br>
          <p style="font-size: 16px;">Warm regards,<br>
          <strong>The Ehani Homes Team</strong><br>
          📧 support@ehani.co.ke<br>
          🌐 <a href="https://ehani.co.ke" style="color: #D4873A; text-decoration: none;">www.ehani.co.ke</a><br>
          <em style="color: #6B5B4E;">Search. Settle. Study.</em></p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
