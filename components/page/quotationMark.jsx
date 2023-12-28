import React from 'react';
import Image from 'next/image';

const QuotationMark = () => {
  return (
    <div className='w-10 md:w-20 pb-2'>
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
