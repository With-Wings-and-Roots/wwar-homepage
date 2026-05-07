'use client';
import React from 'react';

const SingleTypeButton = ({ type, activeType, onChange }) => {
  const isActive = activeType === type.id;

  return (
    <div
      onClick={() => onChange(type.id)}
      className={`
        ${
          isActive
            ? 'bg-wwr_rich_black text-wwr_yellow_orange'
            : 'bg-wwr_yellow_orange hover:bg-wwr_yellow_orange_hovered text-wwr_rich_black hover:text-white'
        }
        w-max px-3 py-1.5 lg:py-3
        cursor-pointer transition-all duration-300 font-extralight
      `}
    >
      {type.name}
    </div>
  );
};

const ProductionTypesTabs = ({
  productionTypes = [],
  activeType,
  onChange,
}) => {
  // 👇 Only first 2 types
  const visibleTypes = productionTypes.slice(0, 2);

  return (
    <div className='flex flex-wrap gap-0.5 my-8 pb-4 items-center'>
      {visibleTypes.map((type, i) => (
        <SingleTypeButton
          key={i}
          type={type}
          activeType={activeType}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default ProductionTypesTabs;
