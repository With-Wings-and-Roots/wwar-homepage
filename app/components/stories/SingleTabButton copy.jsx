"use client";

import { useDispatch, useSelector } from "react-redux";
import { storySelected } from "@/app/store/selectedStory";
import { activatedStories } from "@/app/store/stories";
import Link from "next/link";

const SingleTabButton = ({ buttonText = "", slug }) => {
  const dispatch = useDispatch();

  const tabTitle = buttonText;

  const currentSelection = useSelector(
    (state) => state.entities.selectedStory.selectedStory
  );

  const onClickHandler = () => {
    dispatch(storySelected({ selection: tabTitle }));
    dispatch(activatedStories({ selection: tabTitle }));
  };

  return (
    <Link href={"/stories/topic/" + slug}>
      <div
        onClick={onClickHandler}
        className={`${
          currentSelection === tabTitle
            ? "bg-wwr_rich_black text-wwr_yellow_orange"
            : "bg-wwr_yellow_orange hover:bg-wwr_yellow_orange_hovered text-wwr_rich_black hover:bg-wwr_yellow_orange_hovered hover:text-wwr_white"
        } text-xl w-max p-3  hover:cursor-pointer transition-all duration-300`}
      >
        {tabTitle}
      </div>
    </Link>
  );
};

export default SingleTabButton;
