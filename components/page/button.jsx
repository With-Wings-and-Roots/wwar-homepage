import React from 'react';

const Button = ({ name, color, textDark = false }) => {
  return (
    <div
      className={`${
        color === 'turquoise' ? 'bg-wwr_turquoise' : 'bg-wwr_yellow_orange'
      } ${
        textDark ? 'text-wwr_rich_black' : 'text-wwr_white'
      } w-max py-2 px-4 text-base md:text-lg font-light`}
    >
      {name}
    </div>
  );
};

export default Button;
