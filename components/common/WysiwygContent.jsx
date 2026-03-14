'use client';

import { createLocalLink } from '@/utilities/links';
import { useState } from 'react';

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

  const processedBefore = processLinks(beforeMore);
  const processedAfter = processLinks(afterMore);

  return (
    <div className={`WysiwygContent ${className}`} {...otherProps}>
      <div dangerouslySetInnerHTML={{ __html: processedBefore }} />

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
            {expanded ? 'See Less' : 'See Full'}
          </span>
        </div>
      )}
    </div>
  );
};

export default WysiwygContent;
