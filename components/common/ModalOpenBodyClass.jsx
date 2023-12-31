'use client';

import { useEffect } from 'react';

const ModalOpenBodyClass = () => {
  useEffect(() => {
    document.querySelector('body').classList.add('modal-open');

    return () => {
      document.querySelector('body').classList.remove('modal-open');
    };
  }, []);

  return null;
};

export default ModalOpenBodyClass;
