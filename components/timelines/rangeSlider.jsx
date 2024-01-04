'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { rangeDateChanged } from '@/store/rangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import RangeArrowSVG from '@/components/common/RangeArrowSVG';
import { useRouter } from 'next/navigation';


const RangeSlider = ({timeLineEventDatesArray, uniqueTimeLineEventDatesArray}) => {

  const { rangeSlider: { date: selectedDate } } = useSelector(state => state.entities);
  const dispatch = useDispatch();
  const [value, setValue] = useState(timeLineEventDatesArray[0]);
  const [rangeValue, setRangeValue] = useState(timeLineEventDatesArray[0]);
  const [grab, setGrab] = useState(false);
  const [activeArrows, setActiveArrows] = useState({ left: false, right: true });

  const handleChange = (e) => {
    setGrab(false);
    const targetValue = e.target.value;
    const closestDate = timeLineEventDatesArray.reduce((a, b) =>
      Math.abs(b - targetValue) < Math.abs(a - targetValue) ? b : a
    );
    setRangeValue(closestDate);
    setValue(closestDate);
    dispatch(rangeDateChanged({ date: closestDate }));
  };

  useEffect(() => {
    // Update rangeValue if selectedDate is set from somewhere
    if (selectedDate && timeLineEventDatesArray.includes(selectedDate)) {
      setRangeValue(selectedDate);
      setValue(selectedDate)
    }
  }, [selectedDate, timeLineEventDatesArray]);

  useEffect(() => {
    const currentIndex = uniqueTimeLineEventDatesArray.indexOf(value);
    setActiveArrows({
      left: currentIndex > 0,
      right: currentIndex < uniqueTimeLineEventDatesArray.length - 1,
    });
  }, [uniqueTimeLineEventDatesArray, value]);

  const navArrowHandler = (direction) => {
    const currentIndex = uniqueTimeLineEventDatesArray.indexOf(rangeValue);
    if ((direction === 'left' && currentIndex > 0) || (direction === 'right' && currentIndex < uniqueTimeLineEventDatesArray.length - 1)) {
      const tempValue = uniqueTimeLineEventDatesArray[currentIndex + (direction === 'left' ? -1 : 1)];
      setRangeValue(tempValue);
      setValue(tempValue);
      dispatch(rangeDateChanged({ date: tempValue }));
    }
  };

  return (
    <div className='pb-20 pt-4'>
      <div className='flex w-9/12 m-auto items-center'>
        <div className='flex'>
          <DateText date={timeLineEventDatesArray[0]} />
          <div className='pl-2 flex items-center'>
            <Arrow direction='left' navArrowHandler={navArrowHandler} activeArrows={activeArrows}/>
          </div>
        </div>

        <div className='w-full relative h-20 flex flex-col gap-y-4 justify-center '>
          <input
            type='range'
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
                ? '[&::-webkit-slider-thumb]:cursor-grabbing'
                : '[&::-webkit-slider-thumb]:cursor-grab'
            } `}
          />

          <div className='absolute w-full bottom-0 left-0 font-normal sm:text-xl lg:text-2xl px-3'>
            <div className='relative w-full'>
              <div
                className='absolute top-0 -translate-x-1/2 -translate-y-1/2'
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
        <div className='flex'>
          <div className='pr-2 flex items-center'>
            <Arrow direction='right' navArrowHandler={navArrowHandler} activeArrows={activeArrows}/>
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

const Arrow = ({ navArrowHandler, direction, activeArrows }) => {

  const {left, right} = activeArrows

  const fill = direction === "left" ? (left ? "#fefdfd" : "#46464d") : (right ? "#fefdfd" : "#46464d");

  return (
    <div
      onClick={() => navArrowHandler(direction)}
      className='relative w-6 h-6 overflow-hidden bg-wwr_black  rounded-full hover:scale-125 cursor-pointer transition-transform duration-300'
    >
      <div className={`absolute top-0 left-0 w-8 h-8 -translate-y-1/2 -translate-x-1/2 mt-[50%] ml-[50%]  ${direction === "right" && "rotate-180"}`}>
        <RangeArrowSVG fill={fill}/>
      </div>
    </div>
  );
};

const DateText = ({ date }) => {
  return <div className='font-light sm:text-xl lg:text-2xl'>{date}</div>;
};
