'use client';
import { getHexForColorString } from '@/utilities/color';

const FullPageBackground = ({ color, animation = true }) => {
  return (
    <div
      className={`w-full h-screen fixed top-0 left-0 z-40 opacity-80`}
      style={{ background: getHexForColorString(color) }}
    ></div>
  );
};

export default FullPageBackground;
