'use client';

import { useEffect, useState } from 'react';

const NewsletterFlyout = ({ lang }) => {
  const [open, setOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    const subscribedStatus = localStorage.getItem('newsletter-subscribed');
    const closedTime = localStorage.getItem('newsletter-closed');
    const now = new Date().getTime();

    // Show if not subscribed and either never closed or pause expired
    const pauseDays = 15; // show again after 15 days
    const pauseExpired =
      closedTime &&
      now - parseInt(closedTime, 10) > pauseDays * 24 * 60 * 60 * 1000;

    if (!subscribedStatus && (!closedTime || pauseExpired)) {
      setTimeout(() => setOpen(true), 2000); // show after 2 sec
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Save closed timestamp to localStorage
    localStorage.setItem('newsletter-closed', new Date().getTime().toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('EMAIL');

    try {
      // ✅ CASE 1: English → Mailchimp
      if (lang === 'en') {
        const params = new URLSearchParams();
        formData.forEach((value, key) => params.append(key, value));

        await fetch(
          'https://fromherefilm.us2.list-manage.com/subscribe/post?u=40662e5abd8c9438fbcbc8c40&id=0eeb9c281b&c=?',
          {
            method: 'POST',
            mode: 'no-cors',
            body: params,
          }
        );
      }

      // ✅ CASE 2: Other languages → Brevo
      else {
        // Brevo (other languages)
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, lang: 'German' }),
        });
      }
      // ✅ Success UI
      setSubscribed(true);
      setShowThanks(true);
      localStorage.setItem('newsletter-subscribed', 'true');

      setTimeout(() => setOpen(false), 5000);
    } catch (err) {
      console.error(err);
      alert('Error subscribing. Please try again.');
    }
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-[9999] flex justify-center items-center bg-black/40'>
      <div className='bg-white w-full md:w-[500px] p-6 rounded-t-2xl md:rounded-2xl relative shadow-xl'>
        {/* Close */}
        <button
          onClick={handleClose}
          className='absolute top-3 right-4 text-gray-400 hover:text-black text-xl'
        >
          ✕
        </button>

        {!showThanks ? (
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <h2 className='text-2xl md:text-3xl font-light  py-3'>
              {lang === 'en' ? 'Stay in the loop!' : 'Bleib auf dem Laufenden'}
            </h2>
            <p className='font-light md:text-lg mt-6'>
              {lang === 'en'
                ? 'Get the latest stories and updates straight to your inbox!'
                : 'Erhalte die neuesten Geschichten und Updates direkt in dein Postfach!'}
            </p>

            <input
              type='email'
              name='EMAIL'
              placeholder={lang === 'en' ? 'email address' : 'E-Mail-Adresse'}
              required
              className='border px-4 py-3 text-lg focus:outline-none'
            />

            {/* hidden Mailchimp field */}
            <div style={{ position: 'absolute', left: '-5000px' }}>
              <input
                type='text'
                name='b_40662e5abd8c9438fbcbc8c40_0eeb9c281b'
                tabIndex='-1'
                defaultValue=''
              />
            </div>

            <button
              type='submit'
              className='bg-wwr_yellow_orange text-black py-3 uppercase tracking-wide hover:bg-yellow-500 transition'
            >
              {lang === 'en' ? 'Subscribe' : 'Abonnieren'}
            </button>
          </form>
        ) : (
          <div className='text-center py-10'>
            <h2 className='text-2xl md:text-3xl font-light py-3'>
              {lang === 'en'
                ? 'Subscription Confirmed!'
                : 'Abonnement bestätigt!'}
            </h2>
            <p className='font-light md:text-lg mt-6'>
              {lang === 'en'
                ? 'Thank you for subscribing. Look out for news and updates straight to your inbox!'
                : 'Vielen Dank für dein Abonnement. Freu dich auf Neuigkeiten und Updates direkt in deinem Postfach!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterFlyout;
