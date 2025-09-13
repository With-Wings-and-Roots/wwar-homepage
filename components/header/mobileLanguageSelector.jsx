const MobileLanguageSelector = ({ lang }) => {
  return (
    <>
      <a
        href={`/de`}
        className={`${
          lang === 'de' ? 'font-bold ' : ''
        } hover:text-wwr_white cursor-pointer`}
      >
        DE
      </a>
      <div className='px-2'>/</div>
      <a
        className={`${
          lang === 'en' ? 'font-bold ' : ''
        } hover:text-wwr_white cursor-pointer`}
        href={`/en`}
      >
        EN
      </a>
      <div className='px-2'>/</div>
      <a
        className={`${
          lang === 'ed' ? 'font-bold ' : ''
        } hover:text-wwr_white cursor-pointer`}
        href={`/ed`}
      >
        Easy German
      </a>
    </>
  );
};

export default MobileLanguageSelector;
