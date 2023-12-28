"use client";

import React from "react";
import { germanySelected, usaSelected } from "@/store/timeline";
import { useDispatch, useSelector } from "react-redux";
import { rangeDateChanged } from "@/store/rangeSlider";

const TimelineCountry = ({ firstDate, language }) => {
  const dispatch = useDispatch();
  const selectedCountry = useSelector(
    (state) => state.entities.timeline.country
  );
  return (
    <div className="flex flex-wrap gap-y-2 mb-4 text-2xl lg:text-4xl font-extralight">
      <div
        className={`min-w-max ${
          selectedCountry === "us" ? "font-normal" : " cursor-pointer"
        }`}
        onClick={() => {
          if (selectedCountry !== "us") {
            dispatch(usaSelected({}));
            dispatch(rangeDateChanged({ date: firstDate.en }));
          }
        }}
      >
        {language === "de" && <>USA</>}
        {language !== "de" && <>UNITED STATES</>}
      </div>
      <div className="font-normal px-4">/</div>
      <div
        className={`min-w-max ${
          selectedCountry === "de" ? "font-normal" : " cursor-pointer"
        }`}
        onClick={() => {
          if (selectedCountry !== "de") {
            dispatch(germanySelected({}));
            dispatch(rangeDateChanged({ date: firstDate.de }));
          }
        }}
      >
        {language === "de" && <>DEUTSCHLAND</>}
        {language !== "de" && <>GERMANY</>}
      </div>
    </div>
  );
};

export default TimelineCountry;
