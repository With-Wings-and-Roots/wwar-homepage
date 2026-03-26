import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, lang, fName = '', lName = '' } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    const listId = 2; // <-- Replace with your actual Brevo list ID

    // Check if contact exists
    let contactExists = false;
    try {
      const checkResponse = await fetch(
        `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'api-key': process.env.BREVO_API_KEY,
          },
        }
      );
      contactExists = checkResponse.status === 200;
    } catch (err) {}

    // Prepare contact data
    const contactData = {
      email,
      listIds: [listId],
      updateEnabled: true, // allows updating existing contact
      attributes: {
        VORNAME: fName,
        NACHNAME: lName,
        LANGUAGE: lang || '',
      },
    };

    let responseData = null;

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
      responseData = await createResponse.json();
      return NextResponse.json({
        success: true,
        created: true,
        data: responseData,
      });
    } else {
      // Update existing contact
      const updateResponse = await fetch(
        `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
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
      responseData = await updateResponse.json();
      return NextResponse.json({
        success: true,
        created: false,
        message: 'Contact already exists, updated attributes',
        data: responseData,
      });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
