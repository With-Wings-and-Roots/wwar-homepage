"use client";

import React from "react";
import { germanySelected, usaSelected } from "@/app/store/timeline";
import { useDispatch, useSelector } from "react-redux";
import { rangeDateChanged } from "@/app/store/rangeSlider";

const TimelineCountry = ({ firstDate }) => {
  const dispatch = useDispatch();
  const selectedCountry = useSelector(
    (state) => state.entities.timeline.country
  );

  return (
    <div className="flex gap-1">
      <div
        className={`${
          selectedCountry === "us" ? "font-bold" : " cursor-pointer"
        }`}
        onClick={() => {
          if (selectedCountry !== "us") {
            dispatch(usaSelected({}));
            dispatch(rangeDateChanged({ date: firstDate.en }));
          }
        }}
      >
        UNITED STATES
      </div>
      <div>/</div>
      <div
        className={`${
          selectedCountry === "de" ? "font-bold" : " cursor-pointer"
        }`}
        onClick={() => {
          if (selectedCountry !== "de") {
            dispatch(germanySelected({}));
            dispatch(rangeDateChanged({ date: firstDate.de }));
          }
        }}
      >
        GERMANY
      </div>
    </div>
  );
};

export default TimelineCountry;
