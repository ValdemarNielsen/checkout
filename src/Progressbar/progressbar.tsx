import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ProgressBar.css";

type ProgressPoint = {
  id: number;
  label: string;
  path: string;
};

const ProgressBar: React.FC = () => {
  const location = useLocation();
  const [currentProgress, setCurrentProgress] = useState(0);

  const progressPoints: ProgressPoint[] = [
    { id: 0, label: "Shop", path: "/shop" },
    { id: 1, label: "Checkout", path: "/checkout" },
    { id: 2, label: "Payment", path: "/payment" },
    { id: 3, label: "Confirmation", path: "/confirmation" },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = progressPoints.findIndex(
      (point) => point.path === currentPath
    );
    setCurrentProgress(currentIndex);
  }, [location.pathname, progressPoints]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${((currentProgress + 1) / progressPoints.length) * 100}%`,
          }}
        ></div>
      </div>
      <div className="progress-label">
        {progressPoints[currentProgress].label}
      </div>
    </div>
  );
};

export default ProgressBar;
