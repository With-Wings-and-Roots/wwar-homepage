import Image from 'next/image';

const TakePartTemplate = ({ params, data }) => {
  console.log(JSON.stringify(data));

  const renderSection = (data) => (
    <div className='row'>
      <div className='col'>
        {data?.section_image?.length > 0 && (
          <Image
            src={data.section_image}
            alt={data.section_title}
            width='200'
            height='200'
            className={`!w-[200px] !h-auto`}
          />
        )}
      </div>
      <div className='col'>
        <h2>{data?.section_title}</h2>
        {data?.section_text}

        {data?.section_button?.linked_page && data?.section_button?.label && (
          <a href={data.section_button.linked_page}>
            <button>{data.section_button.label}</button>
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: data.title?.rendered }} />
      {data.acf?.intro_text}
      <hr />
      {data.acf?.sections.map((sec) => renderSection(sec))}
    </div>
  );
};

export default TakePartTemplate;
