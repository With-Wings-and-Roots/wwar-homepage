import React from 'react';
import QuotationMark from '@/components/page/quotationMark';
import parse from 'html-react-parser';

const SidebarContentTypeQuote = async ({ content }) => {
  const { sidebar_content_quote } = content;

  const { quote, quote_author, quote_source } = sidebar_content_quote;

  return (
    <div>
      <div className={`w-12 py-2`}>
        <QuotationMark color={'turquoise'} />
      </div>
      <div className={`flex flex-col gap-2`}>
        <div className={'text-3xl leading-normal font-extralight'}>
          {parse(quote)}
        </div>
        <div
          className={`text-base font-normal text-right`}
        >{`- ${quote_author}`}</div>
        <div
          className={`text-xs text-right text-wwr_gray_storm leading-normal`}
        >
          {parse(quote_source)}
        </div>
      </div>
    </div>
  );
};

export default SidebarContentTypeQuote;
