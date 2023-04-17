import React, { useCallback, useEffect, useRef, useState } from "react";
import "./textBannerStyle.css";

function BannerSlider({
  speed,
  direction,
  children,
}: {
  speed: number;
  direction: "right" | "left";
  children: React.ReactNode;
}) {
  const [bannerInstance, setBannerInstance] = useState(1);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const setupInstances = useCallback(() => {
    if (!innerRef?.current || !outerRef?.current) return;

    const { width } = innerRef.current.getBoundingClientRect();
    const { width: parentWidth } = outerRef.current.getBoundingClientRect();
    const instanceWidth = width / innerRef.current.children.length;

    if (width < parentWidth + instanceWidth) {
      setBannerInstance(bannerInstance + Math.ceil(parentWidth / width));
    }
  }, [bannerInstance]);

  useEffect(() => {
    setupInstances();
  }, []);

  return (
    <div className="bannerslider" ref={outerRef}>
      <div className="bannerslidelist" ref={innerRef}>
        {[...Array(bannerInstance)].map((_, ind) => (
          <div
            key={ind}
            className="bannerslidelisttype"
            style={{
              animationDuration: `${speed}s`,
              animationDirection: direction === "right" ? "reverse" : "normal",
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerSlider;
//Inspireret af David Lange (Webdevelopper der laver animationer)
