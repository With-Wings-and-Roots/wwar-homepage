"use client";
import React, { useEffect, useState } from "react";
import { rangeDateChanged } from "@/app/store/rangeSlider";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const RangeSlider = ({ timeLineEventDatesArrayObject }) => {
  const dispatch = useDispatch();
  const selectedCountry = useSelector(
    (state) => state.entities.timeline.country
  );
  const timeLineEventDatesArray =
    timeLineEventDatesArrayObject[selectedCountry] ||
    timeLineEventDatesArrayObject.en;
  const [value, setValue] = useState(timeLineEventDatesArray[0]);
  const [rangeValue, setRangeValue] = useState(timeLineEventDatesArray[0]);
  const [grab, setGrab] = useState(false);
  const uniqueTimeLineEventDatesArray = [...new Set(timeLineEventDatesArray)];

  useEffect(() => {
    setRangeValue((prevRangeValue) => {
      dispatch(rangeDateChanged({ date: prevRangeValue }));
      return prevRangeValue;
    });
  }, [rangeValue, dispatch]);

  const handleChange = (e) => {
    setGrab(false);
    const targetValue = e.target.value;
    if (timeLineEventDatesArray.includes(targetValue)) {
      setRangeValue(targetValue);
      setValue(targetValue);
    } else {
      const closestDate = timeLineEventDatesArray.reduce((a, b) =>
        Math.abs(b - targetValue) < Math.abs(a - targetValue) ? b : a
      );
      setRangeValue(closestDate);
      setValue(closestDate);
    }
  };

  const navArrowHandler = (direction) => {
    const currentIndex = uniqueTimeLineEventDatesArray.indexOf(rangeValue);
    if (direction === "left" && currentIndex > 0) {
      setRangeValue(uniqueTimeLineEventDatesArray[currentIndex - 1]);
    } else if (
      direction === "right" &&
      currentIndex < uniqueTimeLineEventDatesArray.length - 1
    ) {
      setRangeValue(uniqueTimeLineEventDatesArray[currentIndex + 1]);
    }
  };

  return (
    <div className="pb-20 pt-4">
      <div className="flex w-9/12 m-auto items-center">
        <div className="flex">
          <DateText date={timeLineEventDatesArray[0]} />
          <div className="pl-2 flex items-center">
            <Arrow direction="left" navArrowHandler={navArrowHandler} />
          </div>
        </div>

        <div className="w-full relative h-20 flex flex-col gap-y-4 justify-center ">
          <input
            type="range"
            min={timeLineEventDatesArray[0]}
            max={timeLineEventDatesArray[timeLineEventDatesArray.length - 1]}
            value={value}
            onInput={(e) => {
              setValue(e.target.value);
              setGrab(true);
            }}
            onChange={(e) => {
              setValue(e.target.value);
              setGrab(true);
            }}
            onChangeCapture={handleChange}
            onMouseUpCapture={handleChange}
            onTouchEndCapture={handleChange}
            onMouseDown={() => setGrab(true)}
            className={`w-full h-px bg-wwr_black accent-wwr_black rounded-lg appearance-none cursor-pointer dark:bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[24px] [&::-webkit-slider-thumb]:w-[24px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-wwr_black hover:[&::-webkit-slider-thumb]:scale-125 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-300 ${
              grab
                ? "[&::-webkit-slider-thumb]:cursor-grabbing"
                : "[&::-webkit-slider-thumb]:cursor-grab"
            } `}
          />

          <div className="absolute w-full bottom-0 left-0 font-normal sm:text-xl lg:text-2xl px-3">
            <div className="relative w-full">
              <div
                className="absolute top-0 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${
                    ((value - timeLineEventDatesArray[0]) * 100) /
                    (timeLineEventDatesArray[
                      timeLineEventDatesArray.length - 1
                    ] -
                      timeLineEventDatesArray[0])
                  }%`,
                }}
              >
                {value}
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="pr-2 flex items-center">
            <Arrow direction="right" navArrowHandler={navArrowHandler} />
          </div>

          <DateText
            date={timeLineEventDatesArray[timeLineEventDatesArray.length - 1]}
          />
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

const DateText = ({ date }) => {
  return <div className="font-light sm:text-xl lg:text-2xl">{date}</div>;
};
