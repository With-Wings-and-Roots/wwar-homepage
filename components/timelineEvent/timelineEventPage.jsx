import React from 'react';

import FullPageBackground from '../page/fullPageBackground';
import NavigationCircle from '../page/navigationCircle';
import CloseIcon from '../page/closeIcon';
import PageTitle from '../page/pageTitle';
import parse from 'html-react-parser';
import Excerpt from '../page/excerpt';
import GeneralText from '../page/generalText';
import YearButton from '../page/yearButton';
import Sidebar from './sidebar';
import { getTimelineTopicFromId } from '@/utilities/timeline';
import Button from '@/components/page/button';

const TimelineEventPage = async({ timelineEvent, nextSlug, prevSlug, country}) => {

 const {timeline_event_topic,acf: {article: {event_sources, event_resources}}} = timelineEvent;

 console.log(event_resources)

 const topicsArray = await Promise.all(
    timeline_event_topic.map(async (id) => {
      const tempTopic = await getTimelineTopicFromId(id);
      return parse(tempTopic.name);
    })
  );

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
            <YearButton year={year} endYear={endYear} />

            <PageTitle title={title} />

            <div className="flex gap-6 ">
              <div className="w-2/3">
                <Excerpt excerpt={parse(lead_text)} color={"black"} />
                <GeneralText text={parse(text)} />
              </div>
              <div className="w-1/3">
                <Sidebar sidebarContent={timelineEvent.acf?.sidebar_content} />
                <div className={`flex flex-col gap-px mt-10`}>
                  <Button color={`turquoise`}
                          name={country === "us" ? "United States" : `${country === "de" ? "Germany" : ""}`} />
                  <div className={`flex flex-wrap gap-px`}>
                    {topicsArray.map((topicName) => {
                      return <React.Fragment key={topicName}>
                        <Button name={topicName} />
                      </React.Fragment>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={`bg-wwr_gray_storm h-px w-full opacity-20`}></div>
            <div className={`px-4 md:px-8 lg:px-20 pb-10 flex gap-5 font-light text-sm pt-10 `} >
              <div>
                <div className={`text-xl font-normal pb-6`}>Sources</div>
                <ol className={`flex flex-col gap-4`}>
                  {event_sources && event_sources.map((eventSource, index) => {
                    return <li className={`list-decimal [&>p>a]:text-wwr_majorelle_blue [&>p>a]:hover:underline`} key={index}>{parse(eventSource.source)}</li>;
                  })}
                </ol>
              </div>
              <div>
                <div className={`text-xl font-normal pb-6`}>Additional Resources</div>
                <ol className={`flex flex-col gap-4`}>
                  {event_resources && event_resources.map((eventResource, index) => {
                    return <li className={`list-decimal [&>p>a]:text-wwr_majorelle_blue [&>p>a]:hover:underline`} key={index}>{parse(eventResource.resource)}</li>;
                  })}
                </ol>
              </div>

            </div>

          </div>
        </div>


        <NavigationCircle slug={nextSlug} direction={"right"} />
      </div>
    </div>
  );
};

export default TimelineEventPage;
