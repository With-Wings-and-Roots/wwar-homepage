import Image from 'next/image';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';
import { getProjectById } from '@/utilities/projects';
import { fetchMediaFromId } from '@/utilities/media';

const RelatedProjects = async ({ relatedProjectIds, lang = 'en' }) => {
  if (!relatedProjectIds?.length) return null;

  const projects = await Promise.all(
  relatedProjectIds.map(async (id) => {
    const project = await getProjectById(id, lang);

    const media = project[0]?.acf?.banner
      ? await fetchMediaFromId(project[0].acf.banner)
      : null;

    return {
      ...project,
      media,
    };
  })
);

  return (
    <section className="px-8 md:px-16 xl:px-48 py-12 bg-yellow-50 text-black">
      <h2 className="text-3xl md:text-5xl font-light mb-8">
        {lang === 'en' ? 'Related Projects' : 'Verwandte Projekte'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={createLocalLink(`/projects/${project[0]?.slug}`)}
            className="block h-full overflow-hidden flex flex-col bg-white"
          >
            <div className="relative w-full h-40 sm:h-36 bg-gray-200">
              {project.media && (
                <Image
                  src={project?.media?.source_url}
                  alt={project[0]?.title?.rendered}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="p-4 bg-wwr_yellow_orange flex-1 flex items-end">
              <h3 className="text-lg font-medium line-clamp-2">
                {project[0]?.title?.rendered}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;