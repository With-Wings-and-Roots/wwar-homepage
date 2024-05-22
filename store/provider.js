'use client';

import { Provider } from 'react-redux';
import ConfigureStore from './configureStore';
import { useRef } from 'react';

export function Providers({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = ConfigureStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
