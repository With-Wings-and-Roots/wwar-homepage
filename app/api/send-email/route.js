import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { to, subject, html, fName, lName } = body;

    if (!to || !to.includes('@')) {
      return NextResponse.json(
        { error: 'Valid recipient email required.' },
        { status: 400 }
      );
    }

    // Prepare email payload with params so name appears in email
    const emailData = {
      sender: {
        email: 'olga@withwingsandroots.com',
        name: 'With Wings and Roots e.V.',
      },
      to: [{ email: to, name: fName || '' }],
      subject: subject || 'No Subject',
      htmlContent: html || '<p>No content provided</p>',
      params: {
        fName: fName || '',
        lName: lName || '',
      },
    };

    // Send transactional email
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(result, { status: response.status });
    }

    // ---- Check if contact exists ----
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

    // ---- Create or Update contact with name ----
    let contactAdded = false;
    let contactResult = null;

    const contactData = {
      email: to,
      listIds: [2],
      attributes: {
        NACHNAME: fName || '',
        VORNAME: lName || '',
      },
    };

    if (!contactExists) {
      // Create new contact
      const createResponse = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      contactResult = await createResponse.json();
      contactAdded = createResponse.ok;
    } else {
      // Update existing contact with name (so name shows in Brevo UI)
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

    return NextResponse.json({
      success: true,
      emailSent: true,
      contactAdded,
      alreadyExisted: contactExists,
      contactResult,
      emailResult: result,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
