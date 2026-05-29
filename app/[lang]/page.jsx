import { getFrontpageId, getPage } from '@/utilities/pages';
import { getPageSettings } from '@/utilities/pageSettings';
import HomeTemplate from '@/components/templates/HomeTemplate';
import { GoogleAnalytics } from '@next/third-parties/google';
import NewsletterFlyout from '@/components/common/NewsletterFlyout';
import Head from 'next/head';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

export const revalidate = 600; // ISR: 10 minutes
export const dynamicParams = false;
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'de' }, { lang: 'ed' }];
}

const Page = async ({ params }) => {
  const { lang } = params;

  // Fetch homepage
  const frontpageId = await getFrontpageId(lang);
  const pageData = await getPage(lang, frontpageId);

  // Global settings (analytics etc.)
  const pageSettings = await getPageSettings(lang);

  return (
    <>
      <Header lang={lang} />
      {pageSettings?.google_analytics_id && (
        <GoogleAnalytics gaId={pageSettings.google_analytics_id} />
      )}
      <NewsletterFlyout lang={lang} />

      <HomeTemplate data={pageData} params={params} />
      <Footer lang={lang} />
    </>
  );
};

export default Page;
