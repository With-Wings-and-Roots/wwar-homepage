import MaterialGridCard from '@/components/materials/MaterialGridCard';
import { getMaterialById } from '@/utilities/materials';
import Image from 'next/image';
import gfx_bg_blue from '@/public/bg_blue.png';
const RelatedMaterials = async ({
  relatedMaterialIds = [],
  lang = 'en',
  heading,
  className,
}) => {
  if (!relatedMaterialIds?.length) return null;

  // Fetch materials by ID
  const materials = await Promise.all(
    relatedMaterialIds?.map(async (id) => {
      try {
        return await getMaterialById(id, lang);
      } catch (error) {
        console.error(`Failed to fetch material ${id}`, error);
        return null;
      }
    })
  );

  const validMaterials = materials.filter(Boolean);

  if (!validMaterials.length) return null;

  return (
    <section
      className={`relative overflow-hidden bg-black text-white ${className}`}
    >
      {/* Background Image */}
      <Image
        src={gfx_bg_blue}
        alt=''
        fill
        className='absolute inset-0 object-cover opacity-40'
      />

      {/* Content */}
      <div className='relative z-10'>
        <h2 className='text-3xl md:text-5xl font-light mb-8'>{heading}</h2>

        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {validMaterials.map((material) => (
            <MaterialGridCard key={material.id} material={material} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedMaterials;
