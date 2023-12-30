import React from 'react';
import parse from 'html-react-parser';

const PageTitle = ({ title }) => {
  return <div className='text-2xl md:text-4xl pb-16 pt-4'>{parse(title)}</div>;
};

export default PageTitle;
