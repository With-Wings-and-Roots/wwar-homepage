import React from "react";
// import Header from "../header/header";
import FullPageBackground from "../page/fullPageBackground";
import NavigationCircle from "../page/navigationCircle";
import CloseIcon from "../page/closeIcon";
import PageTitle from "../page/pageTitle";
import parse from "html-react-parser";
import Excerpt from "../page/excerpt";
import GeneralText from "../page/generalText";
import YearButton from "../page/yearButton";
import Sidebar from "./sidebar";

const TimelineEventPage = ({ timelineEvent, nextSlug, prevSlug }) => {
  const {
    acf: {
      basic_info: { start_date: date, end_date: endDate } = {},
      article: { lead_text, text, authors } = {},
    } = {},
    title: { rendered: title } = {},
  } = timelineEvent || {};

  const year = date.slice(0, 4);
  const endYear = endDate?.slice(0,4) || null

  return (
    <div className="relative overflow-hidden lg:py-10">
      <FullPageBackground color={"black"} />
      <div className="min-h-[100vh] m-auto relative flex justify-center z-50">
        <NavigationCircle slug={prevSlug} direction={"left"}></NavigationCircle>

        <div className="bg-white w-full sm:mt-10 md:mt-8 sm:w-10/12 md:w-11/12 lg:w-4/5 max-w-[1200px] ">
          <div className="flex w-full p-4 justify-end text-4xl">
            <CloseIcon closeLink={`../timelines?date=${year}`} />
          </div>
          <div className="px-4 md:px-8 lg:px-20 pb-10">
           <YearButton year={year} endYear={endYear}/>
           
            <PageTitle title={title} />

            <div className="flex gap-6 ">
              <div className="w-2/3">
                <Excerpt excerpt={parse(lead_text)} color={"black"} />
                <GeneralText text={parse(text)} />
              </div>
              <div className="w-1/3">
                <Sidebar sidebarContent = {timelineEvent.acf?.sidebar_content?.[0]}/>
              </div>
            </div>

            <div>{authors}</div>
          </div>
        </div>

        <NavigationCircle slug={nextSlug} direction={"right"} />
      </div>
    </div>
  );
};

export default TimelineEventPage;
