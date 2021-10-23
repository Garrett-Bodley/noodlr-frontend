const VolumeIcon = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      height="48"
      width="48"
      focusable="false"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"></path>
    </svg>
  );
};

export default VolumeIcon;
