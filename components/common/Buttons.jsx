import {createLocalLink} from "@/utilities/links";
import Link from "next/link";

const Buttons = ({buttons}) => {
  const getUrlFromButtonTarget = (btn) => {
    if (btn.target[0].file && btn.target[0].file.url) {
      return btn.target[0].file.url;
    } else if (btn.target[0].link) {
      return btn.target[0].link;
    } else if (btn.target[0].page) {
      return createLocalLink(btn.target[0].page);
    }
    return '#';
  };

  const shouldOpenInNewTab = (btn) => {
    if (btn.target[0].file && btn.target[0].file.url) {
      return true;
    } else if (btn.target[0].link) {
      return true;
    } else if (btn.target[0].page) {
      return false;
    }
    return false;
  };

  return (
    <>
      {buttons.map((btn, bI) => (
        <Link
          key={bI}
          href={getUrlFromButtonTarget(btn)}
          target={shouldOpenInNewTab(btn) ? '_blank' : '_self'}
          rel={shouldOpenInNewTab(btn) ? 'noopener noreferrer' : ''}
          className='bg-wwr_yellow_orange text-sm lg:text-lg  font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
        >
          {btn.label}
        </Link>
      ))}
    </>
  )
}

export default Buttons;