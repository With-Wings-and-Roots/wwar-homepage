'use client';
import { sub } from 'date-fns';
import React, { useState } from 'react';

const DownloadModal = ({ open, onClose, selectedFile }) => {
  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null; // Don’t render if modal is closed

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email.trim() ||
      !email.includes('@') ||
      !fName.trim() ||
      !lName.trim()
    ) {
      alert('Please enter a valid email and your full name.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          fName: fName,
          lName: lName,
          subject: `Download Link: ${selectedFile?.label}`,
          html: `
  Hello ${fName},<br/><br/>
  The requested item can be accessed here:<br/>
  <a href="${selectedFile?.target[0]?.file?.url}" target="_blank">${selectedFile?.label}</a><br/><br/>
  Best regards,<br/>
  With Wings and Roots
`,
        }),
      });

      const json = await res.json();

      if (json.success) {
        setSubmitted(true);
      } else {
        console.error('errorrrr', json.error);
        alert(json.error || 'Failed to send email');
      }
    } catch (err) {
      console.error('errorrrr', err);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg w-full max-w-md relative'>
        <button
          onClick={() => {
            setEmail('');
            setSubmitted(false);
            onClose();
          }}
          className='absolute top-2 right-3 text-gray-500 hover:text-black text-lg'
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <h2 className='text-xl font-semibold mb-4'>
              Send “{selectedFile?.label}” to your email
            </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <input
                type='name'
                placeholder='Enter your first name'
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-wwr_yellow_orange'
                required
              />
              <input
                type='name'
                placeholder='Enter your last name'
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-wwr_yellow_orange'
                required
              />
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-wwr_yellow_orange'
                required
              />

              <button
                type='submit'
                disabled={loading}
                className={`w-full bg-wwr_yellow_orange text-white font-medium py-2 rounded-md transition-all ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                }`}
              >
                {loading ? 'Sending...' : 'Send File'}
              </button>
            </form>
          </>
        ) : (
          <div className='text-center'>
            <h2 className='text-lg font-semibold mb-2'>✅ Request received</h2>
            <p>
              The file will be sent to <strong>{email}</strong> shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className='mt-4 bg-wwr_yellow_orange text-white px-4 py-2 rounded-md hover:opacity-90'
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadModal;
