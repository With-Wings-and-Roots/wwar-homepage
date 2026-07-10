'use client';

import { createLocalLink } from '@/utilities/links';
import { useState } from 'react';

/**
 * Clean WordPress output safely:
 * - removes shortcode captions
 * - removes Gutenberg figcaptions
 * - ensures proper spacing after images
 */
const normalizeWordPressHTML = (html) => {
  if (!html) return html;

  return html
    // Classic WP captions
    .replace(/\[caption[^\]]*\]/g, '')
    .replace(/\[\/caption\]/g, '')

    // Gutenberg captions
    .replace(/<figcaption[^>]*>.*?<\/figcaption>/gis, '')

    // Convert WordPress paragraph breaks between inline spans
    .replace(
      /(<span[^>]*>.*?<\/span>)\s*\n\s*(<span[^>]*>)/gis,
      '$1</p><p>$2'
    )

    // FORCE block separation after images
    .replace(/(<img[^>]*>)/g, '$1\n');
};
/**
 * Fix internal links
 */
const processLinks = (html) => {
  if (!html) return html;

  return html.replace(
    /<a\s+([^>]*href="([^"]+)"[^>]*)>/gi,
    (match, attrs, href) => {
      const newHref = createLocalLink(href);
      return `<a ${attrs.replace(href, newHref)}>`;
    }
  );
};

const WysiwygContent = ({ content, className = '', ...otherProps }) => {
  const [expanded, setExpanded] = useState(false);

  if (!content) return null;

  const [beforeMore, afterMore] = content.split('<!--more-->');

  // 1. CLEAN WP OUTPUT
  const cleanBefore = normalizeWordPressHTML(beforeMore);
  const cleanAfter = normalizeWordPressHTML(afterMore);

  // 2. PROCESS LINKS
  const processedBefore = processLinks(cleanBefore);
  const processedAfter = processLinks(cleanAfter);

  return (
    <div
      className={`WysiwygContent ${className}
        [&_ol]:list-decimal [&_ol]:pl-5
        [&_ul]:list-disc [&_ul]:pl-5
        [&_img]:block [&_img]:mb-4
        [&_p]:mb-4`}
      {...otherProps}
    >
      {/* MAIN CONTENT */}
      <div dangerouslySetInnerHTML={{ __html: processedBefore }} />

      {/* READ MORE */}
      {afterMore && (
        <div>
          {expanded && (
            <div dangerouslySetInnerHTML={{ __html: processedAfter }} />
          )}

          <span
            onClick={() => setExpanded(!expanded)}
            style={{
              cursor: 'pointer',
              textDecoration: 'underline',
              display: 'inline-block',
              marginTop: '0.25em',
            }}
          >
            {expanded ? 'Read Less ↑' : 'Read More ↓'}
          </span>
        </div>
      )}
    </div>
  );
};

export default WysiwygContent;