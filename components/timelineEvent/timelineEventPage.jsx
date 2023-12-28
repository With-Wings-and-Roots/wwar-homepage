import React from "react";
import Header from "../header/header";
import FullPageBackground from "../page/fullPageBackground";
import NavigationCircle from "../page/navigationCircle";
import CloseIcon from "../page/closeIcon";
import PageTitle from "../page/pageTitle";

const TimelineEventPage = ({ timelineEvent }) => {
  return (
    <div className="relative overflow-hidden lg:py-10">
      <div className="hidden sm:block fixed z-10 top-0 left-0">
        <Header />
      </div>
      <FullPageBackground color={"blue"} />
      <div className="min-h-[100vh] m-auto relative flex justify-center z-50">
        <NavigationCircle
          slug={"prevSlug"}
          direction={"left"}
        ></NavigationCircle>

        <div className="bg-white w-full sm:mt-10 md:mt-8 sm:w-10/12 md:w-11/12 lg:w-4/5 max-w-[1200px] ">
          <div className="flex w-full p-4 justify-end text-4xl">
            <CloseIcon closeLink={"../timelines"} />
          </div>
          <div className="px-4 md:px-8 lg:px-20 pb-10">
            <PageTitle title={timelineEvent?.title?.rendered} />
            <div>{timelineEvent?.acf?.basic_info.start_date}</div>
            <div>{timelineEvent?.title?.rendered}</div>
            <div>{timelineEvent?.acf?.article.lead_text}</div>
            <div>{timelineEvent?.acf?.article.text}</div>
            <div>{timelineEvent?.acf?.article.authors}</div>
          </div>
        </div>

        <NavigationCircle slug={"nextSlug"} direction={"right"} />
      </div>
    </div>
  );
};

export default TimelineEventPage;
