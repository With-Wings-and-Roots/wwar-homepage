function prependLanguage(str) {
  // Check if the string starts with "/en" or "/de"
  if (!/^\/(en|de)/.test(str)) {
    // If it doesn't, prepend "/en"
    str = '/en' + str;
  }
  return str;
}

export function createLocalLink(link) {
  if (link.startsWith(process.env.NEXT_PUBLIC_CMS_URL)) {
    const url = new URL(link);
    let relativeLink = url.toString().substring(url.origin.length);
    return prependLanguage(relativeLink);
  } else {
    return link;
  }
}
