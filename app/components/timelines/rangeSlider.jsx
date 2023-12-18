"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { rangeDateChanged } from "@/app/store/rangeSlider";
import Image from "next/image";
import { useSelector } from "react-redux";

const RangeSlider = ({ timeLineEventDatesArrayObject }) => {
  let timeLineEventDatesArray;
  const dispatch = useDispatch();
  const selectedCountry = useSelector(
    (state) => state.entities.timeline.country
  );
  if (selectedCountry === "de") {
    timeLineEventDatesArray = timeLineEventDatesArrayObject.de;
  } else {
    timeLineEventDatesArray = timeLineEventDatesArrayObject.en;
  }
  const selectedDate = useSelector((state) => state.entities.rangeSlider.date);
  const [value, setValue] = useState(timeLineEventDatesArray[0]);
  const [rangeValue, setRangeValue] = useState(timeLineEventDatesArray[0]);
  const [grab, setGrab] = useState(false);
  const uniqueTimeLineEventDatesArray = [...new Set(timeLineEventDatesArray)];

  useEffect(() => {
    if (selectedDate != rangeValue) {
      setRangeValue(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    setValue(rangeValue);
    dispatch(rangeDateChanged({ date: rangeValue }));
  }, [rangeValue]);

  const handleChange = (e) => {
    if (timeLineEventDatesArray.indexOf(e.target.value) > -1) {
      setRangeValue(e.target.value);
    } else {
      setRangeValue(
        timeLineEventDatesArray.reduce((a, b) => {
          return Math.abs(b - e.target.value) < Math.abs(a - e.target.value)
            ? b
            : a;
        })
      );
      setValue(rangeValue);
    }
  };

  const navArrowHandler = (direction) => {
    if (direction === "left") {
      if (timeLineEventDatesArray.indexOf(rangeValue) > 0) {
        setRangeValue(
          uniqueTimeLineEventDatesArray[
            uniqueTimeLineEventDatesArray.indexOf(rangeValue) - 1
          ]
        );
      }
    } else {
      if (
        rangeValue < timeLineEventDatesArray[timeLineEventDatesArray.length - 1]
      ) {
        setRangeValue(
          uniqueTimeLineEventDatesArray[
            uniqueTimeLineEventDatesArray.indexOf(rangeValue) + 1
          ]
        );
      }
    }
  };

  return (
    <div>
      <div className="flex w-9/12 m-auto items-center">
        <div className="flex">
          <div>{timeLineEventDatesArray[0]}</div>
          <div className="pl-2">
            <Arrow direction="left" navArrowHandler={navArrowHandler} />
          </div>
        </div>
        {/* <label
        htmlFor="small-range"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {rangeValue}
      </label> */}
        <div className="w-full relative h-20 flex items-center ">
          <input
            id="small-range"
            type="range"
            min={timeLineEventDatesArray[0]}
            max={timeLineEventDatesArray[timeLineEventDatesArray.length - 1]}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onMouseUpCapture={handleChange}
            onTouchEndCapture={handleChange}
            onMouseDown={() => setGrab(true)}
            onMouseUp={() => setGrab(false)}
            className={`w-full h-px bg-wwr_black accent-wwr_black rounded-lg appearance-none cursor-pointer dark:bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[24px] [&::-webkit-slider-thumb]:w-[24px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-wwr_black hover:[&::-webkit-slider-thumb]:scale-125 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-300 ${
              grab
                ? "[&::-webkit-slider-thumb]:cursor-grabbing"
                : "[&::-webkit-slider-thumb]:cursor-grab"
            }`}
          />
          <div
            className="absolute bottom-0 -translate-x-1/2"
            style={{
              left: `${
                ((value - timeLineEventDatesArray[0]) * 100) /
                (timeLineEventDatesArray[timeLineEventDatesArray.length - 1] -
                  timeLineEventDatesArray[0])
              }%`,
            }}
          >
            {value}
          </div>
        </div>
        <div className="flex">
          <div className="pr-2">
            <Arrow direction="right" navArrowHandler={navArrowHandler} />
          </div>

          <div>
            {timeLineEventDatesArray[timeLineEventDatesArray.length - 1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;

const Arrow = ({ navArrowHandler, direction }) => {
  return (
    <div
      onClick={() => navArrowHandler(direction)}
      className="relative w-6 h-6 overflow-hidden bg-wwr_black  rounded-full hover:scale-125 cursor-pointer transition-transform duration-300"
    >
      <div className="absolute top-0 left-0 w-8 h-8 -translate-y-1/2 -translate-x-1/2 mt-[50%] ml-[50%]">
        <Image
          className="min-w-full min-h-full"
          src={
            direction === "left"
              ? "/arrow-left--circle-white.svg"
              : "/arrow-right--circle-darkGray.svg"
          }
          alt={`arrow-${direction}`}
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};
