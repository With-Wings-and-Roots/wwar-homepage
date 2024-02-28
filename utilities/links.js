function prependLanguage(str) {
  // Check if the string starts with "/en" or "/de"
  if (!/^\/(en|de)/.test(str)) {
    // If it doesn't, prepend "/en"
    str = '/en' + str;
  }
  return str;
}

export function createLocalLink(link) {
  if (link?.startsWith(process.env.NEXT_PUBLIC_CMS_URL)) {
    const url = new URL(link);
    let relativeLink = url.toString().substring(url.origin.length);
    return prependLanguage(relativeLink);
  } else {
    return prependLanguage(link);
  }
}

export function createHashString(title) {
  return (
    '#' +
    title
      ?.toLowerCase()
      ?.replace(/\s+/g, '-')
      ?.replace(/[^a-z0-9-]/g, '')
  );
}

export function isExternalLink(link) {
  return (
    !link?.startsWith(process.env.NEXT_PUBLIC_CMS_URL) &&
    link?.startsWith('https://')
  );
}

export function createVideoEmbedLink(link) {
  if (link.includes('vimeo.com')) {
    const vimeoRegex = /^https:\/\/vimeo\.com\/(\d+)$/;
    const targetFormat =
      'https://player.vimeo.com/video/$1?h=dc24e1496c&dnt=1&app_id=122963';

    if (link.startsWith('https://player.vimeo.com/video/')) {
      return link;
    }

    const match = link.match(vimeoRegex);
    if (match) {
      return link.replace(vimeoRegex, targetFormat);
    } else {
      return link;
    }
  }
  return link;
}
