"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { rangeDateChanged } from "@/app/store/rangeSlider";

const RangeSlider = ({ timeLineEventDatesArray }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(timeLineEventDatesArray[0]);
  const [rangeValue, setRangeValue] = useState(timeLineEventDatesArray[0]);

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

  return (
    <div>
      <div className="flex w-9/12 m-auto items-center">
        <div className="">{timeLineEventDatesArray[0]}</div>
        {/* <label
        for="small-range"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
            class="w-full h-px  bg-wwr_black rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
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
        <div>{timeLineEventDatesArray[timeLineEventDatesArray.length - 1]}</div>
      </div>
    </div>
  );
};

export default RangeSlider;
