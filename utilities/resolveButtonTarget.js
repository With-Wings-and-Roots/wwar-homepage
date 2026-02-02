import { fetchMediaFromId } from '@/utilities/media';

export const resolveButtonTargetUrl = async (btn) => {
  const target = btn?.target?.[0];
  if (!target) return '#';

  switch (target.acf_fc_layout) {
    case 'download': {
      try {
        const media = await fetchMediaFromId(target.file);
        return media?.source_url || '#';
      } catch (e) {
        return '#';
      }
    }

    case 'page': {
      return target?.page?.url || target?.page || '#';
    }

    case 'external_link':
      return target.link || '#';

    case 'email':
      return target.email ? `mailto:${target.email}` : '#';

    default:
      return '#';
  }
};
