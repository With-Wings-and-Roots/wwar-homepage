import { getFrontpageId, getPage } from '@/utilities/pages';
import { getPageSettings } from '@/utilities/pageSettings';
import HomeTemplate from '@/components/templates/HomeTemplate';
import { GoogleAnalytics } from '@next/third-parties/google';

export const revalidate = 600; // ISR: 10 minutes

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'de' }];
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
      {pageSettings?.google_analytics_id && (
        <GoogleAnalytics gaId={pageSettings.google_analytics_id} />
      )}

      <HomeTemplate data={pageData} params={params} />
    </>
  );
};

export default Page;
