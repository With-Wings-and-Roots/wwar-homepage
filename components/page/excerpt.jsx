import React from "react";

const Excerpt = ({ excerpt, color }) => {
  return (
    <p
      className={`text-xl lg:text-26px font-light ${
        color === "gray" ? "text-wwr_gray_storm" : "text-wwr_black"
      }`}
    >
      <span className="leading-10">{excerpt}</span>
    </p>
  );
};

export default Excerpt;
