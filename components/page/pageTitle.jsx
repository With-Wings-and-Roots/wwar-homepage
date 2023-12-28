import React from 'react';
import parse from 'html-react-parser';

const PageTitle = ({ title }) => {
  return <div className='text-2xl md:text-4xl pb-6'>{parse(title)}</div>;
};

export default PageTitle;
