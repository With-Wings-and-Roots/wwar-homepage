// components/timelines/ContributorsSection.jsx
import Image from 'next/image';
import Link from 'next/link';
import { getTeamMemberById } from '@/utilities/team';
import { fetchMediaFromId } from '@/utilities/media';

export default async function ContributorsSection({
  headline,
  special_members = [],
  de_contributors = [],
  us_contributors = [],
}) {
  const fetchMemberWithMedia = async (memberId) => {
    const member = await getTeamMemberById(memberId);

    let media = null;
    if (member?.acf?.profile_icon) {
      media = await fetchMediaFromId(member.acf.profile_icon);
    }

    return { ...member, media };
  };

  const ContributorCard = ({ member }) => (
    <Link
      href={member?.acf?.socials?.[0]?.link || '#'}
      className='flex flex-col items-center text-center min-w-[160px]'
    >
      {member.media && (
        <div className='relative w-24 h-24 mb-3'>
          <Image
            src={member.media.source_url || member.media.url}
            alt={member.title.rendered}
            fill
            className='object-contain'
          />
        </div>
      )}

      {member.title?.rendered && (
        <div
          className='text-gray-800 font-medium text-sm'
          dangerouslySetInnerHTML={{ __html: member.title.rendered }}
        />
      )}
    </Link>
  );

  // fetch members
  const germanyMembers = await Promise.all(
    de_contributors?.map(fetchMemberWithMedia) || []
  );

  const usaMembers = await Promise.all(
    us_contributors?.map(fetchMemberWithMedia) || []
  );

  const specialMembers = await Promise.all(
    special_members?.map(fetchMemberWithMedia) || []
  );

  // merge all
  const allMembers = [...germanyMembers, ...usaMembers, ...specialMembers];

  // duplicate for infinite scroll
  const carouselMembers = [...allMembers, ...allMembers];

  return (
    <section className='px-8 md:px-16 xl:px-48 py-20 border-t border-b border-wwr_teal overflow-hidden'>
      <h2 className='font-medium text-xl lg:text-3xl mb-12 '>{headline}</h2>

      <div className='flex gap-12 animate-scroll'>
        {carouselMembers.map((member, i) => (
          <ContributorCard key={i} member={member} />
        ))}
      </div>
    </section>
  );
}
