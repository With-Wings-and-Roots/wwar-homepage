import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import { createLocalLink } from '@/utilities/links';
import Link from 'next/link';

const MaterialsTemplate = ({ data }) => {

  const renderImageVideo = (obj) => {
    if (obj.acf_fc_layout === 'image') {
      return (
        <Image
          src={obj?.image?.url}
          alt={obj?.image?.alt}
          width={obj?.image?.width}
          height={obj?.image?.height}
        />
      );
    } else if (obj.acf_fc_layout === 'video') {
      return <div dangerouslySetInnerHTML={{ __html: obj?.video }} />;
    }

    return null;
  };

  const getUrlFromButtonTarget = (btn) => {
    if (btn.target[0].file && btn.target[0].file.url) {
      return btn.target[0].file.url;
    } else if (btn.target[0].link) {
      return btn.target[0].link;
    } else if (btn.target[0].page) {
      return btn.target[0].page;
    }
    return '#';
  };

  const renderButtons = (btns, pos) => {
    // TODO: Code super redundant, je nach Lösung für untere todos anpassen
    if (pos === 'left') {
      return (
        // TODO: buttons links untereinander unter Video/Bild
        <div>
          {btns.map((btn, bI) => (
            <Link
              key={bI}
              href={createLocalLink(getUrlFromButtonTarget(btn))}
              className='bg-wwr_yellow_orange text-xl font-light px-5 py-2 hover:text-white transition-all uppercase'
            >
              {btn.label}
            </Link>
          ))}
        </div>
      );
    } else if (pos === 'right') {
      return (
        // TODO: buttons rechts nebeneinander unterm Text
        <div>
          {btns.map((btn, bI) => (
            <Link
              key={bI}
              href={createLocalLink(getUrlFromButtonTarget(btn))}
              className='bg-wwr_yellow_orange text-xl font-light px-5 py-2 hover:text-white transition-all uppercase'
            >
              {btn.label}
            </Link>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderSection = (entry, key) => (
    <div
      className='grid grid-cols-4 gap-6 border-t border-t-gray-200 mt-8 pt-8'
      key={key}
    >
      <div className='col-span-1'>{renderImageVideo(entry.imagevideo[0])}</div>
      <div className='col-span-4 lg:col-span-3 flex flex-col'>
        <h1 dangerouslySetInnerHTML={{ __html: entry?.title }} />
        <WysiwygContent
          content={entry?.text}
          className='mt-2 md:text-lg font-light'
        />
      </div>
      {renderButtons(entry?.buttons, entry?.buttons_position)}
    </div>
  );

  return (
    <div
      className='px-8 md:px-16 lg:px-64 pt-8 pb-16 relative'
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
      />
      <h1
        dangerouslySetInnerHTML={{ __html: data.title?.rendered }}
        className='text-3xl md:text-6xl font-normal text-center'
      />
      {/*TODO: hier die anchor links unter die Überschrift*/}
      {data.acf?.entries.map((ent, eI) => renderSection(ent, eI))}
    </div>
  );
};

export default MaterialsTemplate;
