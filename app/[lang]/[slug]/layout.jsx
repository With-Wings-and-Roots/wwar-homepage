import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import { getPageBySlug } from '@/utilities/pages';
import { getTranslations } from '@/utilities/pages';

export default async function LangLayout({ children, params }) {
  const { lang, slug } = params;

  let translations = null;
  if (slug) {
    const pageData = await getPageBySlug(lang, slug);
    if (pageData) {
      translations = await getTranslations(lang, pageData.id);
    }
  }

  return (
    <>
      <Header lang={lang} translations={translations} />
      {children}
      <Footer lang={lang} />
    </>
  );
}
