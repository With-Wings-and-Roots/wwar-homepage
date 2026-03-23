// components/timelines/ContributorsSection.jsx
import Image from 'next/image';
import Link from 'next/link';
import { getTeamMemberById } from '@/utilities/team';
import { fetchMediaFromId } from '@/utilities/media';
import ContributorCard from './ContributorCard';

export default async function ContributorsSection({
  headline,
  contributors = [],
}) {
  if (!contributors || contributors.length === 0) return null; // no contributors to show
  const fetchMemberWithMedia = async (memberId) => {
    const member = await getTeamMemberById(memberId);

    let media = null;
    if (member?.acf?.profile_icon) {
      media = await fetchMediaFromId(member.acf.profile_icon);
    }

    return { ...member, media };
  };

  // fetch members

  const members = await Promise.all(
    contributors?.map(fetchMemberWithMedia) || []
  );
  const allMembers = [...members, ...members, ...members];

  return (
    <section className='px-8 md:px-16 xl:px-48 py-20 overflow-hidden'>
      <h2 className='font-medium text-xl lg:text-3xl mb-12 '>{headline}</h2>

      <div className='flex  scroll-track flex-nowrap'>
        {allMembers.map((member, i) => (
          <ContributorCard key={`${member.id}-${i}`} member={member} />
        ))}
      </div>
    </section>
  );
}
