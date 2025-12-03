import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { to, subject, html, fName, lName, language, saveContact } = body;

    if (!to || !to.includes('@')) {
      return NextResponse.json(
        { error: 'Valid recipient email required.' },
        { status: 400 }
      );
    }

    // --- 1. Send transactional email ---
    const emailData = {
      sender: {
        email: 'olga@withwingsandroots.com',
        name: 'With Wings and Roots e.V.',
      },
      to: [{ email: to, name: fName || '' }],
      subject: subject || 'No Subject',
      htmlContent: html || '<p>No content provided</p>',
      params: { fName: fName || '', lName: lName || '', language },
    };

    let emailResult;
    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      emailResult = await response.json();

      if (!response.ok) {
        console.error('Email send error:', emailResult);
        return NextResponse.json(emailResult, { status: response.status });
      }
    } catch (err) {
      console.error('Email sending failed:', err);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // --- 2. Save/update contact only if consented ---
    let contactAdded = false;
    let contactResult = null;

    if (saveContact) {
      try {
        // Check if contact exists
        const checkResponse = await fetch(
          `https://api.brevo.com/v3/contacts/${encodeURIComponent(to)}`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'api-key': process.env.BREVO_API_KEY,
            },
          }
        );

        const contactExists = checkResponse.status === 200;

        const contactData = {
          email: to,
          listIds: [2],
          attributes: {
            NACHNAME: fName || '',
            VORNAME: lName || '',
            LANGUAGE: language,
          },
        };

        if (!contactExists) {
          // Create new contact
          const createResponse = await fetch(
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
          contactResult = await createResponse.json();
          contactAdded = createResponse.ok;
        } else {
          // Update existing contact
          const updateResponse = await fetch(
            `https://api.brevo.com/v3/contacts/${encodeURIComponent(to)}`,
            {
              method: 'PUT',
              headers: {
                accept: 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json',
              },
              body: JSON.stringify({ attributes: contactData.attributes }),
            }
          );
          contactResult = await updateResponse.json();
        }
      } catch (err) {
        console.error('Brevo contact save/update failed (ignored):', err);
        // Do NOT throw — email already sent
      }
    }

    // --- 3. Return response ---
    return NextResponse.json({
      success: true,
      emailSent: true,
      contactAdded,
      contactResult,
      emailResult,
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
