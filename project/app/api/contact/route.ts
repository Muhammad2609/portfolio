import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, subject, message } = await request.json();

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'you@yourdomain.com',
      to: email,
      subject,
      text: message,
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
