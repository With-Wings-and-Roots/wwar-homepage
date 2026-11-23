
'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { createLocalLink } from '@/utilities/links';

const WorkshopFilmsCarousel = ({ films = [], lang = 'en', pageLink = '' }) => {
  const sliderRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Update arrow visibility
  const updateArrows = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    setCanScrollLeft(slider.scrollLeft > 5);

    setCanScrollRight(
      slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 5
    );
  };

  useEffect(() => {
    updateArrows();

    const slider = sliderRef.current;
    if (!slider) return;

    const observer = new ResizeObserver(updateArrows);
    observer.observe(slider);

    return () => observer.disconnect();
  }, [films]);

  // Scroll carousel
  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction * slider.clientWidth * 0.85,
      behavior: 'smooth',
    });
  };

  // Get plain-text synopsis
  const getSynopsis = (film) => {
    const synopsis = film?.acf?.short_synopsis || '';

    return synopsis
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  };

  if (!films.length) return null;

  return (
    <div className="relative">

      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous films"
          className="
            absolute left-0 top-1/2
            -translate-y-1/2 -translate-x-1/2
            z-20 w-11 h-11
            rounded-full
            bg-wwr_yellow_orange text-black
            shadow-md
            flex items-center justify-center
            transition-colors
            hover:bg-wwr_yellow_orange hover:text-black
          "
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M15 18l-6-6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Film Slider */}
      <div
        ref={sliderRef}
        onScroll={updateArrows}
        className="
          flex gap-8
          overflow-x-auto
          scroll-smooth
          snap-x snap-mandatory
          pb-4
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {films.map((film) => {
          const synopsis = getSynopsis(film);

          const runtime =
            film?.acf?.runtime || film?.acf?.duration || '';

          const year = film?.acf?.year?.slice(0, 4) || '';

          return (
            <a
              key={film.id}
              href={createLocalLink(
                `${pageLink}/${film.slug}`
              )}
              className="
                group block flex-none
                w-[85%]
                sm:w-[calc((100%-2rem)/2)]
                lg:w-[calc((100%-4rem)/3)]
                snap-start
                bg-[#171717]
                text-white
                overflow-hidden
                shadow-md
                rounded-lg
              "
            >
              {/* Film Image */}
              <div className="relative aspect-video overflow-hidden bg-[#242424]">

                {film.posterUrl && (
                  <Image
                    src={film.posterUrl}
                    alt={film?.title?.rendered || ''}
                    fill
                    sizes="
                      (max-width: 640px) 85vw,
                      (max-width: 1024px) 50vw,
                      33vw
                    "
                    className="
                      object-cover
                      transition-all duration-500
                      group-hover:scale-105
                      group-hover:brightness-[0.35]
                    "
                  />
                )}

                {/* Hover Overlay */}
                <div
                  className="
                    absolute inset-0
                    flex flex-col justify-end
                    p-5
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                    bg-black/20
                  "
                >
                  {/* Runtime */}
                  {runtime && (
                    <p className="text-xs uppercase tracking-widest text-white/80 mb-3">
                      {runtime}
                    </p>
                  )}

                  {/* Short Synopsis */}
                  {synopsis && (
                    <p className="text-sm text-white leading-relaxed line-clamp-3 mb-5">
                      {synopsis}
                    </p>
                  )}

                  {/* View Film */}
                  <div className="flex items-center gap-2 text-wwr_yellow_orange text-sm uppercase tracking-widest font-semibold">
                    <span>
                      {lang === 'en' ? 'View Film' : 'Film ansehen'}
                    </span>

                    <span aria-hidden="true">→</span>
                  </div>
                </div>

                {/* Play Cue */}
                <div
                  className="
                    absolute top-4 right-4
                    w-10 h-10 rounded-full
                    border border-wwr_yellow_orange
                    flex items-center justify-center
                    text-wwr_yellow_orange
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 ml-0.5"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Film Information */}
              <div className="px-4 py-4 min-h-[100px] flex flex-col justify-center">

                <h3
                  className="
                    font-semibold
                    text-base md:text-lg
                    leading-snug
                    line-clamp-2
                    min-h-[3rem]
                    group-hover:text-wwr_yellow_orange
                    transition-colors duration-300
                  "
                >
                  {film?.title?.rendered}
                </h3>

                <div className="flex items-center justify-between gap-3 mt-2">

                  <p className="text-sm text-white/60">
                    {year}
                  </p>

                  {/* Runtime on mobile */}
                  {runtime && (
                    <p className="text-xs text-white/60 md:hidden">
                      {runtime}
                    </p>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next films"
          className="
            absolute right-0 top-1/2
            -translate-y-1/2 translate-x-1/2
            z-20 w-11 h-11
            rounded-full
            bg-wwr_yellow_orange text-black
            shadow-md
            flex items-center justify-center
            transition-colors
            hover:bg-wwr_yellow_orange hover:text-black
          "
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M9 18l6-6-6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

    </div>
  );
};

export default WorkshopFilmsCarousel;
