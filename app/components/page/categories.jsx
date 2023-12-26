import React from "react";
import parse from "html-react-parser";

const Categories = ({ categories }) => {
  return (
    <>
      {categories.map((category, index) => {
        return (
          <React.Fragment key={index}>
            <div>
              <div className="w-max bg-wwr_yellow_orange px-4 py-2 text-sm text-wwr_white transition-all duration-500">
                {parse(category.name)}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Categories;
