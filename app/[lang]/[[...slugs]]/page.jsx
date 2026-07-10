import { getAllPages, getFrontpageId, getPage, getTranslations } from '@/utilities/pages';
import { notFound } from 'next/navigation';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import DefaultTemplate from '@/components/templates/DefaultTemplate';
import StoriesTemplate from '@/components/templates/StoriesTemplate';
import AboutTemplate from '@/components/templates/AboutTemplate';
import CollaboratorsTemplate from '@/components/templates/CollaboratorsTemplate';
import EventsTemplate from '@/components/templates/EventsTemplate';
import WorkshopsTemplate from '@/components/templates/WorkshopsTemplate';
import TakePartTemplate from '@/components/templates/TakePartTemplate';
import DonateTemplate from '@/components/templates/DonateTemplate';
import MaterialsTemplate from '@/components/templates/MaterialsTemplate';
import HomeTemplate from '@/components/templates/HomeTemplate';
import TimelinesTemplate from '@/components/templates/TimelinesTemplate';
import {
  fetchAllTopics,
  getAllMedia,
  getAllPersons,
  getAllStories,
} from '@/utilities/stories';
import {
  getTimeline,
  getTimelineCountries,
  getTimelineEras,
  getTimelineEvents,
  getTimelineTopics,
} from '@/utilities/timeline';
import { getPageSettings } from '@/utilities/pageSettings';
import { GoogleAnalytics } from '@next/third-parties/google';
import PartnersTemplate from '@/components/templates/PartnersTemplate';
import BlogTemplate from '@/components/templates/BlogTemplate';
import { getAllPosts } from '@/utilities/posts';
import OurWorkTemplate from '@/components/templates/OurWorkTemplate';
import ProjectTemplate from '@/components/templates/ProjectTemplate';
import AllProjectsTemplate from '@/components/templates/AllProjectsTemplate';
import StorytellersTemplate from '@/components/templates/StorytellersTemplate';
import { fetchAllCollections } from '@/utilities/collections';
import SingleMaterialTemplate from '@/components/templates/SingleMaterialTemplate';
import {
  getAllLanguages,
  getAllMaterials,
  getMaterialBySlug,
  getMaterialCollections,
  getMaterialTypes,
} from '@/utilities/materials';
import { getTeamMemberById } from '@/utilities/team';
import NewsletterFlyout from '@/components/common/NewsletterFlyout';
import AllFilmsTemplate from '@/components/templates/AllFilmsTemplate';
import {
  getAllFilms,
  getFilmBySlug,
  getFilmLanguages,
  getFilmProductionTypes,
  getFilmTypes,
} from '@/utilities/films';
import SingleFilmTemplate from '@/components/templates/SingleFilmTemplate';
import {
  getAllWorkshops,
  getWorkshopAudience,
  getWorkshopBySlug,
  getWorkshopProductionTypes,
  getWorkshopTopics,
} from '@/utilities/workshops';
import SingleWorkshopTemplate from '@/components/templates/SingleWorkshopTemplate';
import ForEducatorsTemplate from '@/components/templates/ForEducatorsTemplate';

const Page = async ({ params, searchParams }) => {
  const pageSettings = await getPageSettings(params.lang);

  const pages = await getAllPages(params.lang);

  // find page by slugs
  let pageSlugs = [...(params.slugs ?? [])];
  let pageSlug = '';
  let subSlugs = [];
  let pageObj;
  if (pageSlugs.length > 0) {
    while (pageSlugs.length > 0) {
      pageObj = pages.find((page) => {
        const url = new URL(page.link);
        const urlPageSlug = url
          .toString()
          .substring(url.origin.length)
          .replace(/^\/|\/$/g, '')
          .replace(/^(de\/|en\/|ed\/)/, '');
        return urlPageSlug === pageSlugs?.join('/');
      });
      if (pageObj) {
        pageSlug = pageObj.link;
        break;
      }
      subSlugs = [...subSlugs, pageSlugs.pop()];
    }
    if (!pageObj) {
      const frontpageId = await getFrontpageId(params.lang);
      pageObj = pages.find((page) => page.id === parseInt(frontpageId));
      subSlugs = [...(params.slugs ?? [])];
    }
  } else {
    const frontpageId = await getFrontpageId(params.lang);
    pageObj = pages.find((page) => page.id === parseInt(frontpageId));
  }

  let stories,
    allMediaDe,
    allMediaEd,
    allMediaEn,
    allPersons,
    topics,
    languages,
    collections,
    allMedia,
    materials,
    timelineCountries,
    timeLineEventsDe,
    timeLineEventsEn,
    timelineEras,
    timelineTopics,
    filmProductionTypes,
    AllFilms;
        let translations = null;


  // get page
  let template;
  if (pageObj) {
    const pageData = await getPage(params.lang, pageObj.id);
    if (pageData) {
      translations = await getTranslations(params.lang, pageData.id);
    }
  
    switch (pageObj.template) {
      case 'page_stories.php':
        [
          stories,
          allMediaDe,
          allMediaEd,
          allMediaEn,
          allPersons,
          topics,
          collections,
          timeLineEventsDe,
          timeLineEventsEn,
        ] = await Promise.all([
          getAllStories(params.lang),
          getAllMedia('de'),
          getAllMedia('ed'),
          getAllMedia('en'),
          getAllPersons(),
          fetchAllTopics(params.lang),
          fetchAllCollections(params.lang),
          getTimeline('de', params.lang),
          getTimeline('us', params.lang),
        ]);
        allMedia = [...allMediaDe, ...allMediaEn, ...allMediaEd];
        template = (
          <StoriesTemplate
            data={pageData}
            params={params}
            subSlugs={subSlugs}
            baseLink={pageSlug}
            stories={stories}
            allMedia={allMedia}
            allPersons={allPersons}
            topics={topics}
            collections={collections}
            timeLineEventsDe={timeLineEventsDe}
            timeLineEventsEn={timeLineEventsEn}
          />
        );
        break;
      case 'page_timelines.php':
        [
          timeLineEventsDe,
          timeLineEventsEn,
          timelineTopics,
          timelineEras,
          allMediaDe,
          allMediaEd,
          allMediaEn,
          stories,
          allPersons,
          timelineCountries,
        ] = await Promise.all([
          getTimeline('de', params.lang),
          getTimeline('us', params.lang),
          getTimelineTopics(params.lang),
          getTimelineEras(params.lang),
          getAllMedia('de'),
          getAllMedia('ed'),
          getAllMedia('en'),
          getAllStories(params.lang),
          getAllPersons(),
          getTimelineCountries(params.lang),
        ]);
        allMedia = [...allMediaDe, ...allMediaEn, ...allMediaEd];
        template = (
          <TimelinesTemplate
            data={pageData}
            params={params}
            subSlugs={subSlugs}
            baseLink={pageSlug}
            timeLineEventsDe={timeLineEventsDe}
            timeLineEventsEn={timeLineEventsEn}
            allMedia={allMedia}
            timelineTopics={timelineTopics}
            timelineEras={timelineEras}
            stories={stories}
            allPersons={allPersons}
            timelineCountries={timelineCountries}
          />
        );
        break;
      case 'page_about.php':
        template = <AboutTemplate data={pageData} />;
        break;
      case 'page_blog.php':
        [stories, allPersons] = await Promise.all([
          getAllStories(params.lang),
          getAllPersons(),
        ]);
        template = (
          <BlogTemplate
            data={pageData}
            params={params}
            stories={stories}
            allPersons={allPersons}
          />
        );
        break;
      case 'page_collaborators.php':
        const customTeam = pageData.acf?.custom_team || [];
        const teamSections = await Promise.all(
          customTeam.map(async (section) => {
            const members = section.team_members?.length
              ? (
                  await Promise.all(
                    section.team_members.map((id) =>
                      getTeamMemberById(id, params.lang).catch(() => null)
                    )
                  )
                ).filter(Boolean)
              : [];

            return {
              title: section.title,
              members,
            };
          })
        );

        template = (
          <>
            <CollaboratorsTemplate
              data={pageData}
              subSlugs={subSlugs}
              baseLink={pageSlug}
              teamSections={teamSections}
            />
            <PartnersTemplate teamSections={teamSections} />
          </>
        );
        break;
      case 'page_events.php':
        template = <EventsTemplate data={pageData} params={params} />;
        break;
      case 'page_educators.php':
        template = <ForEducatorsTemplate data={pageData} lang={params.lang} />;
        break;
      case 'page_workshops.php':
        let workshop;
        if (subSlugs.length > 0) {
          if (subSlugs.length > 2) {
            workshop = await getWorkshopBySlug(subSlugs[2], params.lang);
          } else {
            workshop = await getWorkshopBySlug(subSlugs[0], params.lang);
          }
          if (!workshop || workshop.length === 0) {
            return notFound();
          }
          // const team = film?.acf?.team || [];
          // const relatedTeams = await Promise.all(
          //   team.map(async (team) => {
          //     const members = Array.isArray(team.team_member)
          //       ? (
          //           await Promise.all(
          //             team.team_member.map((id) =>
          //               getTeamMemberById(id, params.lang).catch(() => null)
          //             )
          //           )
          //         ).filter(Boolean)
          //       : [];

          //     return {
          //       team_title: team.role,
          //       related_members: members,
          //     };
          //   })
          // );
          const [allMediaDe, allMediaEd, allMediaEn, allPersons, topics] =
            await Promise.all([
              getAllMedia('de'),
              getAllMedia('ed'),
              getAllMedia('en'),
              getAllPersons(),
              fetchAllTopics(params.lang),
            ]);
          allMedia = [...allMediaDe, ...allMediaEn, ...allMediaEd];

          template = (
            <SingleWorkshopTemplate
              lang={params.lang}
              data={pageData}
              workshop={workshop}
              subSlugs={subSlugs}
              allMedia={allMedia}
              allPersons={allPersons}
              topics={topics}
              // relatedTeams={relatedTeams}
            />
          );
        } else {
          const workshops = await getAllWorkshops(params.lang);
          const workshopProductionTypes = await getWorkshopProductionTypes(
            params.lang
          );
          const audience = await getWorkshopAudience(params.lang);
          const workshopTopics = await getWorkshopTopics(params.lang);
          template = (
            <WorkshopsTemplate
              lang={params.lang}
              data={pageData}
              subSlugs={subSlugs}
              workshops={workshops}
              workshopProductionTypes={workshopProductionTypes}
              workshopAudience={audience}
              workshopTopics={workshopTopics}
            />
          );
        }
        break;
      case 'page_takePart.php':
        template = <TakePartTemplate data={pageData} />;
        break;
      case 'page_donate.php':
        template = <DonateTemplate data={pageData} />;
        break;
      case 'page_materials.php':
        [materials, topics, collections, languages] = await Promise.all([
          getAllMaterials(params.lang),
          getMaterialTypes(params.lang),
          getMaterialCollections(params.lang),
          getAllLanguages(params.lang),
        ]);
        template = (
          <MaterialsTemplate
            data={pageData}
            lang={params.lang}
            materials={materials}
            topics={topics}
            collections={collections}
            languages={languages}
            params={searchParams}
          />
        );
        break;
      case 'page_material.php':
        let material;
        if (subSlugs.length > 2) {
          material = await getMaterialBySlug(subSlugs[2], params.lang);
        } else if (subSlugs.length === 2) {
          material = await getMaterialBySlug(subSlugs[1], params.lang);
        } else {
          material = await getMaterialBySlug(subSlugs[0], params.lang);
        }

        const team = material[0]?.acf?.team || [];

const relatedTeams = await Promise.all(
  team.map(async (teamItem) => {
    const members = Array.isArray(teamItem.related_memebers)
      ? (
          await Promise.all(
            teamItem.related_memebers.map(async (item) => {
              const memberId = item?.member?.[0];

              if (!memberId) return null;

              const member = await getTeamMemberById(
                memberId,
                params.lang
              ).catch(() => null);

              if (!member) return null;

              return {
                member,
                specific_role: item.specific_role,
              };
            })
          )
        ).filter(Boolean)
      : [];

    return {
      team_title: teamItem.team_title,
      related_members: members,
    };
  })
);

        [allMediaDe, allMediaEd, allMediaEn, topics, allPersons] =
          await Promise.all([
            getAllMedia('de'),
            getAllMedia('ed'),
            getAllMedia('en'),
            fetchAllTopics(params.lang),
            getAllPersons(),
          ]);
        allMedia = [...allMediaDe, ...allMediaEn, ...allMediaEd];
        template = (
        <SingleMaterialTemplate
            subSlugs={subSlugs}
            lang={params.lang}
            data={pageData}
            material={material}
            allMedia={allMedia}
            topics={topics}
            allPersons={allPersons}
            relatedTeams={relatedTeams}
          />
        );
        break;

      case 'page_projects.php':
        template = (
          <AllProjectsTemplate
            lang={params.lang}
            data={pageData}
            subSlugs={subSlugs}
          />
        );
        break;
      case 'page_storytellers.php':
        [
          stories,
          allPersons,
          allMediaEn,
          allMediaDe,
          allMediaEd,
          topics,
          timeLineEventsDe,
          timeLineEventsEn,
        ] = await Promise.all([
          getAllStories(params.lang),
          getAllPersons(),
          getAllMedia('en'),
          getAllMedia('de'),
          getAllMedia('ed'),
          fetchAllTopics(params.lang),
          getTimeline('de', params.lang),
          getTimeline('us', params.lang),
        ]);
        allMedia = [...allMediaDe, ...allMediaEn, ...allMediaEd];
        template = (
          <StorytellersTemplate
            subSlugs={subSlugs}
            stories={stories}
            allPersons={allPersons}
            allMedia={allMedia}
            lang={params.lang}
            topics={topics}
            allEvents={timeLineEventsDe.concat(timeLineEventsEn)}
            params={params}
          />
        );
        break;
      case 'page_project.php':
        template = <ProjectTemplate subSlugs={subSlugs} lang={params.lang} />;
        break;
      case 'page_ourwork.php':
        template = <OurWorkTemplate data={pageData} params={params} />;
        break;
      case 'page_films.php':
        let film;
        if (subSlugs.length > 0) {
          if (subSlugs.length > 2) {
            film = await getFilmBySlug(subSlugs[2], params.lang);
          } else {
            film = await getFilmBySlug(subSlugs[0], params.lang);
          }
          const team = film?.acf?.team || [];
          const relatedTeams = await Promise.all(
            team.map(async (team) => {
              const members = Array.isArray(team.team_member)
                ? (
                    await Promise.all(
                      team.team_member.map((id) =>
                        getTeamMemberById(id, params.lang).catch(() => null)
                      )
                    )
                  ).filter(Boolean)
                : [];

              return {
                team_title: team.role,
                related_members: members,
              };
            })
          );
          const [allMediaDe, allMediaEd, allMediaEn, allPersons, topics] =
            await Promise.all([
              getAllMedia('de'),
              getAllMedia('ed'),
              getAllMedia('en'),
              getAllPersons(),
              fetchAllTopics(params.lang),
            ]);
          allMedia = [...allMediaDe, ...allMediaEn, ...allMediaEd];

          template = (
            <SingleFilmTemplate
              lang={params.lang}
              data={pageData}
              film={film}
              subSlugs={subSlugs}
              allMedia={allMedia}
              allPersons={allPersons}
              topics={topics}
              relatedTeams={relatedTeams}
            />
          );
        } else {
          const films = await getAllFilms(params.lang);
          filmProductionTypes = await getFilmProductionTypes(params.lang);
          const languages = await getFilmLanguages(params.lang);
          const filmTypes = await getFilmTypes(params.lang);
          template = (
            <AllFilmsTemplate
              lang={params.lang}
              data={pageData}
              subSlugs={subSlugs}
              films={films}
              filmProductionTypes={filmProductionTypes}
              filmLanguages={languages}
              filmTypes={filmTypes}
            />
          );
        }
        break;
      case 'page_home.php':
        template = (
          <HomeTemplate data={pageData} params={params} subSlugs={subSlugs} />
        );
        break;
      default:
        template = <DefaultTemplate data={pageData} params={params} />;
        break;
    }
  } else {
    return notFound();
  }

  return (
    <>
      {pageSettings?.google_analytics_id &&
      pageSettings?.google_analytics_id?.length > 0 ? (
        <GoogleAnalytics gaId={pageSettings.google_analytics_id} />
      ) : null}
      <Header lang={params.lang} translations={translations} />
      <NewsletterFlyout lang={params.lang} />

      {template}

      <Footer lang={params.lang} />
    </>
  );
};

export default Page;
