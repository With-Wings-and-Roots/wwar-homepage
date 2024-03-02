const LanguageSelector = ({ lang }) => {
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
    </>
  );
};

export default LanguageSelector;
