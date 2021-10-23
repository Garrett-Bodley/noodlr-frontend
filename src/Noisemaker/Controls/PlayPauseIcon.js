import React from "react";
import { animated } from "react-spring";

const PlayPauseIcon = (props) => {
  return (
    <animated.svg
      {...props}
      viewBox="0 0 24 24"
      width="3em"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m3.65 6.62 7.5 4.75c.22.14.33.35.35.58v-4.7c0-.41.33-.75.75-.75h3c.41 0 .75.34.75.75v9.5c0 .41-.34.75-.75.75h-3a.75.75 0 0 1-.75-.75v-4.69a.74.74 0 0 1-.35.58l-7.5 4.74a.75.75 0 0 1-1.15-.63v-9.5c0-.6.65-.95 1.15-.63zm17.6-.12c.41 0 .75.34.75.75v9.5c0 .41-.34.75-.75.75h-3a.75.75 0 0 1-.75-.75v-9.5c0-.41.33-.75.75-.75h3z" />
    </animated.svg>
  );
};

export default PlayPauseIcon;
