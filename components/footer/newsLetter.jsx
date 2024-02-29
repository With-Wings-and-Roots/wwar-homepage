import React from 'react';
import FooterSocialIcons from '@/components/footer/footerSocialIcons';
import CopyrightAndTerms from '@/components/footer/copyrightAndTerms';

const NewsLetter = ({ footerData }) => {
  const footer = footerData;

  return (
    <div className='pt-10'>
      <div className='flex flex-row space-between gap-8 flex-wrap xl:flex-col'>
        <form
          action='https://fromherefilm.us2.list-manage.com/subscribe/post?u=40662e5abd8c9438fbcbc8c40&amp;id=0eeb9c281b'
          method='post'
          id='mc-embedded-subscribe-form'
          name={'mc-embedded-subscribe-form'}
          className='validate flex-grow'
          target='_blank'
          noValidate
        >
          <div
            id='mc_embed_signup_scroll'
            className='flex flex-wrap max-w-[600px]'
          >
            <label
              htmlFor='mce-EMAIL'
              className='w-full text-lg pb-2 font-extralight'
            >
              {footer.newsletter_title}
            </label>
            <input
              type='email'
              defaultValue=''
              name='EMAIL'
              className='email input-field flex-grow pr-2 pl-4 tracking-wider text-xl font-light text-wwr_rich_black focus:outline-none'
              id='mce-EMAIL'
              placeholder='email address'
              required
            />
            <div
              style={{ position: 'absolute', left: '-5000px' }}
              aria-hidden='true'
            >
              <input
                type='text'
                name='b_40662e5abd8c9438fbcbc8c40_0eeb9c281b'
                tabIndex='-1'
                defaultValue=''
              />
            </div>
            <div className='clear'>
              <input
                type='submit'
                value='Subscribe'
                name='subscribe'
                id='mc-embedded-subscribe'
                className='cursor-pointer button px-3 uppercase text-xl bg-wwr_gray_storm h-12 tracking-wide hover:bg-wwr_outer_space duration-300'
              />
            </div>
          </div>
        </form>

        <FooterSocialIcons footer={footer} />
      </div>
    </div>
  );
};

export default NewsLetter;
