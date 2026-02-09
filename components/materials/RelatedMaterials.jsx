import MaterialGridCard from '@/components/materials/MaterialGridCard';
import { getMaterialById } from '@/utilities/materials'; // adjust if your util name differs

const RelatedMaterials = async ({ relatedMaterialIds = [], lang = 'en' }) => {
  if (!relatedMaterialIds.length) return null;

  // Fetch materials by ID
  const materials = await Promise.all(
    relatedMaterialIds.map(async (id) => {
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
    <section className='px-8 md:px-16 xl:px-48 py-12 bg-yellow-50 text-black'>
      <h2 className='text-3xl md:text-5xl font-light mb-8'>
        {lang === 'en' ? 'Related Materials' : 'Zugehörige Materialien'}
      </h2>

      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {validMaterials.map((material) => (
          <MaterialGridCard key={material.id} material={material} />
        ))}
      </div>
    </section>
  );
};

export default RelatedMaterials;
