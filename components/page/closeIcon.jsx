import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CloseIcon = ({ closeLink }) => {
  return (
    <Link href={closeLink}>
      <div className='hover:rotate-90 transition-all duration-500'>
        <Image src={'/close-icon.svg'} width={45} height={45} alt='Close' />
      </div>
    </Link>
  );
};

export default CloseIcon;
