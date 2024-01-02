"use client"
import RangeSlider from "./rangeSlider"
import { useEffect } from 'react';
import { rangeDateChanged } from '@/store/rangeSlider';
import { useDispatch } from 'react-redux';

const RangeSliderWrapper = ({ timeLineEventDatesArrayObject, searchParams })=>{

  const dispatch = useDispatch()

  useEffect(() => {
    // Dispatch rangeDateChanged on initial load with the value from searchParams.date
    if(searchParams.date){
      dispatch(rangeDateChanged({ date: Number(searchParams.date) }));
    }
  }, [dispatch,searchParams.date]);

  return<>
<RangeSlider timeLineEventDatesArrayObject={timeLineEventDatesArrayObject} />
  </>
}

export default RangeSliderWrapper