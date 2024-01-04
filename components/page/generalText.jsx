import React from 'react';

const GeneralText = ({ text, children=null }) => {
  return <div className='text-base leading-7 font-light'>{children?children:text}</div>;
};

export default GeneralText;
