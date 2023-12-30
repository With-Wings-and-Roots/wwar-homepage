import React from 'react';
import Image from 'next/image';

const QuotationMark = () => {
  return (
    <div className='w-full'>
      <Image
        className='w-full'
        src='/quotation-mark.svg'
        alt='quotation mark'
        width={100}
        height={100}
      />
    </div>
  );
};

export default QuotationMark;
