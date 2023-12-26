import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavigationCircle = ({ slug, direction }) => (
  <div className="hidden sm:flex min-w-max grow justify-center text-2xl sm:text-3xl lg:text-6xl items-center h-[100vh] text-wwr_white">
    <div className="relative w-16 h-16 mb-16">
      <div className="fixed">
        <Link href={`./${slug}`}>
          <Image
            src={direction === "left" ? "/arrow-left.svg" : "/arrow-right.svg"}
            width={64}
            height={64}
            className="w-16 h-16"
            alt="arrow"
          />
        </Link>
      </div>
    </div>
  </div>
);
export default NavigationCircle;
