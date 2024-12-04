import React from "react";

type PieChartProps = {
  percentage: number; // Value between 0 and 100
  size?: number; // Size of the pie chart
  strokeWidth?: number; // Width of the stroke for the pie chart
};

export default function PieChart({
  percentage,
  size = 100,
  strokeWidth = 10,
}: PieChartProps) {
  // Validate the percentage value
  if (percentage < 0 || percentage > 100) {
    throw new Error("Percentage must be between 0 and 100");
  }

  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference * ((100 - percentage) / 100); // Offset for the stroke

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e6e6e6" // Background color
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#4caf50" // Pie chart color
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate to start from the top
        style={{ transition: "stroke-dashoffset 0.3s ease" }} // Animation effect
      />
    </svg>
  );
}
