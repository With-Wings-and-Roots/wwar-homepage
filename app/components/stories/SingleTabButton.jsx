import React from "react";

const SingleTabButton = ({ children }) => {
  return (
    <div className="text-xl text-wwr_rich_black bg-wwr_yellow_orange w-max p-3 hover:text-wwr_white hover:cursor-pointer hover:bg-wwr_yellow_orange_hovered transition-all duration-300">
      {children}
    </div>
  );
};

export default SingleTabButton;
