import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message, type, saveContact } = body;

    // ✅ Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // 🎯 Route email based on type
    let recipient = 'info@withwingsandroots.com';

    // ✅ Email content
    const emailData = {
      sender: {
        email: 'olga@withwingsandroots.com',
        name: 'With Wings and Roots Website',
      },
      to: [{ email: recipient }],
      replyTo: {
        email,
        name,
      },
      subject: subject || 'New Contact Form Message',
      htmlContent: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type || 'General'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // --- 1. Send Email ---
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error('Email send error:', emailResult);
      return NextResponse.json(emailResult, {
        status: emailResponse.status,
      });
    }

    // --- 2. Save Contact (optional) ---
    let contactAdded = false;

    if (saveContact) {
      try {
        const contactData = {
          email,
          listIds: [2], // your Brevo list
          attributes: {
            FIRSTNAME: name,
            SOURCE: 'Contact Form',
          },
        };

        const contactResponse = await fetch(
          'https://api.brevo.com/v3/contacts',
          {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'api-key': process.env.BREVO_API_KEY,
              'content-type': 'application/json',
            },
            body: JSON.stringify(contactData),
          }
        );

        contactAdded = contactResponse.ok;
      } catch (err) {
        console.error('Contact save failed (ignored):', err);
      }
    }

    // --- 3. Success response ---
    return NextResponse.json({
      success: true,
      emailSent: true,
      contactAdded,
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
