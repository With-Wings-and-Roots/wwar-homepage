"use client";

import React from "react";
import { germanySelected, usaSelected } from "@/app/store/timeline";
import { useDispatch, useSelector } from "react-redux";

const TimelineCountry = () => {
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
        onClick={() => dispatch(usaSelected({}))}
      >
        UNITED STATES
      </div>
      <div>/</div>
      <div
        className={`${
          selectedCountry === "de" ? "font-bold" : " cursor-pointer"
        }`}
        onClick={() => dispatch(germanySelected({}))}
      >
        GERMANY
      </div>
    </div>
  );
};

export default TimelineCountry;
