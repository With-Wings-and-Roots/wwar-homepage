// components/timelines/ContributorsSection.jsx
import Image from 'next/image';
import Link from 'next/link';
import { getTeamMemberById } from '@/utilities/team';
import { fetchMediaFromId } from '@/utilities/media';

export default async function ContributorsSection({
  de_headline,
  us_headline,
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
      className='flex flex-col items-center text-center gap-4'
    >
      {member.media && (
        <div className='relative w-32 h-32'>
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
          className='text-gray-800 font-medium'
          dangerouslySetInnerHTML={{ __html: member.title.rendered }}
        />
      )}
    </Link>
  );

  // Fetch all members for each section
  const germanyMembers = await Promise.all(
    de_contributors?.map(fetchMemberWithMedia) || []
  );
  const usaMembers = await Promise.all(
    us_contributors?.map(fetchMemberWithMedia) || []
  );
  const specialMembers = await Promise.all(
    special_members?.map(fetchMemberWithMedia) || []
  );

  return (
    <section className='px-8 md:px-16 xl:px-48 py-20'>
      {/* Germany */}
      {germanyMembers.length > 0 && (
        <div className='mb-16'>
          <h2 className='text-3xl md:text-5xl font-light mb-12'>
            {de_headline}
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center'>
            {germanyMembers.map((member) => (
              <ContributorCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      )}

      {/* USA */}
      {usaMembers.length > 0 && (
        <div className='mb-16'>
          <h2 className='text-3xl md:text-5xl font-light mb-12'>
            {us_headline}
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center'>
            {usaMembers.map((member) => (
              <ContributorCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      )}

      {/* Special Members */}
      {specialMembers.length > 0 && (
        <div className='mb-16'>
          <h2 className='text-3xl md:text-5xl font-light mb-12'>
            Special Members
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center'>
            {specialMembers.map((member) => (
              <ContributorCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
