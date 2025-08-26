import './globals.css';

import { Providers } from '@/store/provider';

export const metadata = {
  title: 'With Wings And Roots',
};

export const dynamicParams = true;
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang='en'>
        <head>
          <link rel='stylesheet' href='https://use.typekit.net/ufp0hxo.css' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C400%2C300%2C600%2C700'
          />
        </head>
        <body className={`font-main pt-20 min-h-[100dvh] flex flex-col`}>
          {children}
        </body>
      </html>
    </Providers>
  );
}
