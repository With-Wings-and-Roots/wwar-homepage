"use client";
import { useDispatch, useSelector } from "react-redux";
import { storiesAdded } from "@/app/store/stories";

export default function StoriesList({ stories }) {
  const dispatch = useDispatch();

  return (
    <div onClick={() => dispatch(storiesAdded({ stories }))}>StoriesList</div>
  );
}
