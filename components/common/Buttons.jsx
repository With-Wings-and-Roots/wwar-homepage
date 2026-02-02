'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DownloadModal from './DownloadModal';
import { resolveButtonTargetUrl } from '@/utilities/resolveButtonTarget';

const Buttons = ({ buttons }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [resolvedButtons, setResolvedButtons] = useState([]);

  useEffect(() => {
    const resolveButtons = async () => {
      if (!Array.isArray(buttons)) return;

      const resolved = await Promise.all(
        buttons.map(async (btn) => {
          const target = btn?.target?.[0];
          const resolvedUrl = await resolveButtonTargetUrl(btn);

          return {
            ...btn,
            resolvedUrl,
            layout: target?.acf_fc_layout,
          };
        })
      );

      setResolvedButtons(resolved);
    };

    resolveButtons();
  }, [buttons]);

  return (
    <>
      {resolvedButtons.map((btn, index) => {
        // DOWNLOAD → modal button
        if (btn.layout === 'download') {
          return (
            <button
              key={index}
              onClick={() => {
                setSelectedFile(btn);
                setOpenModal(true);
              }}
              className='bg-wwr_yellow_orange text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
            >
              {btn.label}
            </button>
          );
        }

        // EVERYTHING ELSE → link
        const openInNewTab = btn.layout === 'external_link';

        return (
          <Link
            key={index}
            href={btn.resolvedUrl}
            target={openInNewTab ? '_blank' : '_self'}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
            className='bg-wwr_yellow_orange text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
          >
            {btn.label}
          </Link>
        );
      })}

      <DownloadModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedFile={selectedFile}
      />
    </>
  );
};

export default Buttons;
