import React from 'react';

const Button = ({ name, color }) => {
  return (
    <div
      className={`${
        color === 'turquoise' ? 'bg-wwr_turquoise' : 'bg-wwr_yellow_orange'
      } w-max text-wwr_white py-2 px-4 text-base md:text-lg font-light`}
    >
      {name}
    </div>
  );
};

export default Button;
