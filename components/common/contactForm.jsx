'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general',
    saveContact: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'general',
          saveContact: false,
        });
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className='max-w-xl mx-auto space-y-6'>
      {/* Heading */}
      <h2 className='text-3xl font-medium text-center my-6'>Reach out to Us by filling this form</h2>
      <p className='font-light text-lg mb-4 text-center'>
        Let us know how we can help you!
      </p>

      <form onSubmit={handleSubmit} className='max-w-xl mx-auto space-y-4'>
        {/* Name */}
        <input
          type='text'
          name='name'
          placeholder='Your Name'
          value={form.name}
          onChange={handleChange}
          required
          className='w-full border p-3'
        />

        {/* Email */}
        <input
          type='email'
          name='email'
          placeholder='Your Email'
          value={form.email}
          onChange={handleChange}
          required
          className='w-full border p-3'
        />

        {/* Type */}
        <select
          name='type'
          value={form.type}
          onChange={handleChange}
          className='w-full border p-3'
        >
          <option value='general'>General Inquiry</option>
          <option value='film'>Film</option>
          <option value='timeline'>Timeline</option>
        </select>

        {/* Subject */}
        <input
          type='text'
          name='subject'
          placeholder='Subject'
          value={form.subject}
          onChange={handleChange}
          className='w-full border p-3'
        />

        {/* Message */}
        <textarea
          name='message'
          placeholder='Your Message'
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className='w-full border p-3'
        />

        {/* Newsletter */}
        <label className='flex items-center gap-2 text-sm'>
          <input
            type='checkbox'
            name='saveContact'
            checked={form.saveContact}
            onChange={handleChange}
          />
          Subscribe to newsletter
        </label>

        {/* Button */}
        <button
          type='submit'
          disabled={loading}
          className='bg-black text-white px-6 py-3 hover:bg-gray-800 transition'
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>

        {/* Success */}
        {success && (
          <p className='text-green-600'>Message sent successfully!</p>
        )}
      </form>
    </div>
  );
}
