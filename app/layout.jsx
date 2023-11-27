import Footer from "./components/footer/footer";
import "./globals.css";

import { Providers } from "./store/provider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://use.typekit.net/ufp0hxo.css" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C400%2C300%2C600%2C700"
          />
        </head>
        <body className={`font-main`}>
          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
