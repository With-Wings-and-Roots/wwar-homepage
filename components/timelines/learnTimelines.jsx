'use client';

import RangeArrowSVG from '@/components/common/RangeArrowSVG';
import { useState } from 'react';
import CloseIcon from '@/components/page/closeIcon';
import PageTitle from '@/components/page/pageTitle';
import GeneralText from '@/components/page/generalText';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const LearnTimelines = ({ data }) => {
  const pathName = usePathname();

  if (!data) return null;

  const { pc_button_label, pc_main_column, pc_sidebar } = data;

  return (
    <>
      {/* Button to open overlay */}
      <Link href='./timelines/info'>
        <div className='flex global_width justify-center gap-2 text-base text-wwr_gray_storm cursor-pointer '>
          <div>{pc_button_label || 'Learn how these timelines were made'}</div>
          <div className='rotate-180 w-5'>
            <RangeArrowSVG fill={'#46464d'} />
          </div>
        </div>
      </Link>

      {/* Overlay */}
      {pathName.endsWith('/timelines/info') && (
        <div className='w-screen min-h-screen h-screen fixed overflow-y-scroll left-0 top-0 z-[9999]'>
          {/* Background */}
          <div className='w-screen h-full fixed top-0 left-0 opacity-80 bg-wwr_black'></div>

          {/* Content */}
          <div className='global_width relative pt-20 pb-40'>
            <div className='w-full bg-wwr_white p-4'>
              {/* Close button */}
              <div className='w-full flex justify-end'>
                <CloseIcon closeLink='./' />
              </div>

              <div className='px-5 md:px-20 pb-20'>
                {/* Main title */}
                <PageTitle
                  title={pc_main_column?.title || 'Who created this timeline?'}
                />

                <div className='flex flex-wrap md:flex-nowrap gap-10'>
                  {/* LEFT COLUMN: Text */}
                  <div className='w-full md:w-2/3'>
                    <GeneralText>
                      <div
                        className='flex flex-col gap-6'
                        dangerouslySetInnerHTML={{
                          __html: pc_main_column?.text || '',
                        }}
                      />
                    </GeneralText>
                  </div>

                  {/* RIGHT COLUMN: Sidebar */}
                  {pc_sidebar && (
                    <div className='w-full sm:w-1/3 shrink-0 text-wwr_gray_storm flex flex-col gap-6'>
                      {pc_sidebar.image && (
                        <div>
                          <Image
                            className='aspect-square w-full h-full'
                            width={400}
                            height={400}
                            src={pc_sidebar.image}
                            alt={pc_sidebar.title || 'Timeline Sidebar Image'}
                          />
                        </div>
                      )}
                      {pc_sidebar.title && (
                        <div className='font-normal text-wwr_black text-2xl'>
                          {pc_sidebar.title}
                        </div>
                      )}
                      {pc_sidebar.text && (
                        <GeneralText>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: pc_sidebar.text,
                            }}
                          />
                        </GeneralText>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LearnTimelines;
