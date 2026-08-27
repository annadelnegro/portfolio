"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  rightLabel?: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  className?: string;
  hideHeader?: boolean;
  endOffset?: number;
}

export const Timeline = ({
  data,
  className,
  hideHeader = false,
  endOffset = 0,
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const embeddedOffset = hideHeader ? endOffset : 0;
      setHeight(Math.max(rect.height + embeddedOffset, 0));
    }
  }, [ref, hideHeader, endOffset]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={`timeline-root w-full bg-transparent font-sans md:px-10 ${className ?? ""}`}
      ref={containerRef}
    >
      {!hideHeader && (
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Changelog from my journey
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          I&apos;ve been working on Aceternity for the past 2 years. Here&apos;s
          a timeline of my journey.
          </p>
        </div>
      )}

      <div
        ref={ref}
        className={`timeline-content-wrap relative max-w-7xl mx-auto ${hideHeader ? "pb-0" : "pb-20"}`}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className={`timeline-row ${hideHeader ? "timeline-row-compact" : "flex justify-start pt-10 md:pt-40 md:gap-10"}`}
          >
            <div className={`timeline-sticky ${hideHeader ? "relative" : "sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"}`}>
              <div className={`timeline-dot-wrap ${hideHeader ? "timeline-dot-wrap-compact" : "h-10 absolute left-3 md:left-3 w-10"} rounded-full bg-white dark:bg-black flex items-center justify-center`}>
                <div className="timeline-dot h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className={`timeline-title ${hideHeader ? "hidden" : "hidden md:block text-xl md:pl-20 md:text-5xl"} font-bold text-neutral-500 dark:text-neutral-500`}>
                {item.title}
              </h3>
            </div>

            <div className={`timeline-item-content relative w-full ${hideHeader ? "pl-0 pr-0" : "pl-20 pr-4 md:pl-4"}`}>
              <h3 className={`timeline-title-mobile ${hideHeader ? "timeline-title-inline block mb-2 text-left" : "md:hidden block text-2xl mb-4 text-left"} font-bold text-neutral-500 dark:text-neutral-500`}>
                {item.title}
              </h3>
              {item.content}{" "}
            </div>

            {hideHeader && item.rightLabel && (
              <div className="timeline-right-label">{item.rightLabel}</div>
            )}
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className={`timeline-track ${hideHeader ? "timeline-track-compact" : "md:left-8 left-8"} absolute top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] `}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="timeline-track-progress absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
