import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <circle cx="50" cy="50" r="40" fill="#4da6ff" />
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      fill="white"
      fontSize="20px"
      dy=".3em"
    >
      AI
    </text>
  </svg>
);

export default Logo;
