import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_j1s4M13t_MHcVaFgcd8dBbMgfxJDRPxDz');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);
    
    const { name, email, message, requestCV } = body;

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'Muh4mm4d2609@gmail.com',
      subject: `New Contact Form Submission${requestCV ? ' (CV Requested)' : ''}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>CV Requested:</strong> ${requestCV ? 'Yes' : 'No'}</p>
      `
    });
    console.log('Admin email response:', adminEmailResponse);

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Thank you for your message',
      html: `
        <h3>Thank you for contacting Muhammad Patel</h3>
        <p>Dear ${name},</p>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <blockquote style="margin: 1em 0; padding: 1em; background-color: #f5f5f5; border-left: 4px solid #333;">
          ${message}
        </blockquote>
        ${requestCV ? '<p>As requested, I will send you my CV in my response.</p>' : ''}
        <p>Best regards,<br>Muhammad Patel</p>
      `
    });
    console.log('User confirmation email response:', userEmailResponse);

    return NextResponse.json({ 
      message: 'Email sent successfully',
      adminEmailId: adminEmailResponse.data?.id,
      userEmailId: userEmailResponse.data?.id
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}