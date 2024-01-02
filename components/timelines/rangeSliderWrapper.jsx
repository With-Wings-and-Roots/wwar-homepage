"use client"
import RangeSlider from "./rangeSlider"
import { useEffect, useMemo } from 'react';
import { rangeDateChanged } from '@/store/rangeSlider';
import { useDispatch, useSelector } from 'react-redux';

const RangeSliderWrapper = ({ timeLineEventDatesArrayObject, searchParams })=>{
  const { country: selectedCountry } = useSelector(state => state.entities);

  const dispatch = useDispatch()

  const timeLineEventDatesArray = useMemo(() => timeLineEventDatesArrayObject[selectedCountry] || timeLineEventDatesArrayObject.en, [timeLineEventDatesArrayObject,selectedCountry]);
  const uniqueTimeLineEventDatesArray = useMemo(() => [...new Set(timeLineEventDatesArray)], [timeLineEventDatesArray]);


  useEffect(() => {
    // Dispatch rangeDateChanged on initial load with the value from searchParams.date
    if(searchParams.date){
      dispatch(rangeDateChanged({ date: Number(searchParams.date) }));
    }
  }, [dispatch,searchParams.date]);

  return<>
<RangeSlider timeLineEventDatesArray={timeLineEventDatesArray} uniqueTimeLineEventDatesArray={uniqueTimeLineEventDatesArray} />
  </>
}

export default RangeSliderWrapper