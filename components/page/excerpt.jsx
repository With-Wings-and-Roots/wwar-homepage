import React from 'react';

const Excerpt = ({ excerpt, color }) => {
  return (
    <p
      className={`text-xl lg:text-26px font-light pb-8 ${
        color === 'gray' ? 'text-wwr_gray_storm' : 'text-wwr_black'
      }`}
    >
      <span
        className='leading-10'
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
    </p>
  );
};

export default Excerpt;
