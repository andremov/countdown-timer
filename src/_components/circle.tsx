import React from "react";

type PieChartProps = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export default function PieChart({
  percentage,
  size = 100,
  strokeWidth = 10,
  className = "",
}: PieChartProps) {
  if (percentage < 0 || percentage > 100) {
    throw new Error("Percentage must be between 0 and 100");
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * ((100 - percentage) / 100);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: "scale(-1, 1)", display: "block" }}
      className={className}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#4caf50"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 0.3s ease" }}
      />
    </svg>
  );
}
