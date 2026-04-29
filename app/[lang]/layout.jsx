import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

export default function LangLayout({ children, params }) {
  const { lang } = params;

  return (
    <>
      <Header lang={lang} />
      {children}
      <Footer lang={lang} />
    </>
  );
}
