"use client";

import { useSelector, useDispatch } from "react-redux";
import { darkModeToggled } from "../store/darkMode";

const DarkMode = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.entities.darkMode.darkMode);

  return (
    <div class={darkMode && "dark"}>
      <p
        class="bg-white dark:bg-blue-800 text-gray-700 dark:text-yellow-300 cursor-pointer min-h-screen w-full flex justify-center items-center text-4xl transition-all duration-500"
        onClick={() => dispatch(darkModeToggled({}))}
      >
        Click anywhere for dark mode test
      </p>
    </div>
  );
};

export default DarkMode;
