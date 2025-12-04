'use client';

import { useState } from 'react';

const WysiwygContent = ({ content, className = '', ...otherProps }) => {
  const [expanded, setExpanded] = useState(false);

  if (!content) return null;

  // Split content at WordPress <!--more--> tag
  const [beforeMore, afterMore] = content.split('<!--more-->');

  return (
    <div className={`WysiwygContent ${className}`} {...otherProps}>
      <div dangerouslySetInnerHTML={{ __html: beforeMore }} />

      {afterMore && (
        <div>
          {expanded && <div dangerouslySetInnerHTML={{ __html: afterMore }} />}
          <span
            onClick={() => setExpanded(!expanded)}
            style={{
              cursor: 'pointer',
              fontWeight: 'inherit',
              fontSize: 'inherit',
              color: 'inherit',
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
