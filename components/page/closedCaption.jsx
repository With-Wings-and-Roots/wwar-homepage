import React from "react";
import Image from "next/image";

const ClosedCaption = () => {
  return (
    <div>
      <Image
        className="mb-3"
        src="/closed-captions.svg"
        width={30}
        height={30}
        alt="closed caption"
      />
      <div className="text-base font-bold">Closed Captions available</div>
      <div className="text-xs font-light text-wwr_gray_storm py-3">
        <div className="leading-[17px]">{`We have subtitles available for this video! Turn on
                        subtitles by clicking the CC (closed captions) icon in
                        the video player and enjoy the content in English.`}</div>
      </div>
    </div>
  );
};

export default ClosedCaption;
