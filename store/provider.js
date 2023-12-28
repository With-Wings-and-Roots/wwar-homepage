'use client';

import { Provider } from 'react-redux';
import ConfigureStore from './configureStore';

export function Providers({ children }) {
  const store = ConfigureStore();

  return <Provider store={store}>{children}</Provider>;
}
