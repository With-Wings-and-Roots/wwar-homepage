'use client';
import { createLocalLink } from '@/utilities/links';
import { set } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import DownloadModal from './DownloadModal';

const Buttons = ({ buttons }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const getUrlFromButtonTarget = (btn) => {
    if (btn.target[0]?.file && btn.target[0].file.url) {
      return btn.target[0].file.url;
    } else if (btn.target[0]?.link) {
      return btn.target[0].link;
    } else if (btn.target[0]?.page) {
      return createLocalLink(btn.target[0].page);
    } else if (btn.target[0]?.email) {
      return `mailto:${btn.target[0].email}`;
    }
    return '#';
  };

  const shouldOpenInNewTab = (btn) => {
    if (btn.target[0]?.file && btn.target[0].file.url) {
      return true;
    } else if (btn.target[0]?.link) {
      return true;
    } else if (btn.target[0]?.page) {
      return false;
    }
    return false;
  };

  const downloadableFiles = buttons?.filter(
    (btn) => btn.target[0]?.file && btn.target[0].file.url
  );
  const restOfButtons = buttons?.filter(
    (btn) => !btn.target[0]?.file || !btn.target[0].file.url
  );
  return (
    <>
      {Array.isArray(downloadableFiles)
        ? downloadableFiles?.map((btn, bI) => (
            <button
              key={bI}
              onClick={() => {
                setOpenModal(true);
                setSelectedFile(btn);
              }}
              rel={shouldOpenInNewTab(btn) ? 'noopener noreferrer' : ''}
              className='bg-wwr_yellow_orange text-sm lg:text-lg  font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
            >
              {btn.label}
            </button>
          ))
        : null}
      {Array.isArray(restOfButtons)
        ? restOfButtons?.map((btn, bI) => (
            <Link
              key={bI}
              href={getUrlFromButtonTarget(btn)}
              target={shouldOpenInNewTab(btn) ? '_blank' : '_self'}
              rel={shouldOpenInNewTab(btn) ? 'noopener noreferrer' : ''}
              className='bg-wwr_yellow_orange text-sm lg:text-lg  font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
            >
              {btn.label}
            </Link>
          ))
        : null}
      <DownloadModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedFile={selectedFile}
      />{' '}
    </>
  );
};

export default Buttons;
