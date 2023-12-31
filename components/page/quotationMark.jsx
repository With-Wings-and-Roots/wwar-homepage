import React from 'react';
import QuotationMarkSVG from '@/components/common/QuotationMarkSVG';

const QuotationMark = ({ color = null }) => {
  return (
    <div className='w-full'>
      <QuotationMarkSVG color={color} />
    </div>
  );
};

export default QuotationMark;
