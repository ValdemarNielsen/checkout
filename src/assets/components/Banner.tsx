import React from "react";
import BannerSlider from "./textBannerComponent";

function Banner() {
  return (
    <div>
      <BannerSlider speed={50} direction="left">
        <div className="text">
          <p>
            Limited time offer: 10% off your first purchase with code
            "10PERCENT"
          </p>
        </div>

        <div className="text">
          <p>New arrivals: Check out our latest products!</p>
        </div>

        <div className="text">
          <p>Sale: Up to 50% off selected items</p>
        </div>

        <div className="text">
          <p>
            Customer review: "I love this product! So glad I found it here!"
          </p>
        </div>

        <div className="text">
          <p>Best sellers: See what everyone is buying</p>
        </div>

        <div className="text">
          <p>Flash sale: 24-hour deals on select products</p>
        </div>

        <div className="text">
          <p>Trending now: Get the latest suplements</p>
        </div>

        <div className="text">
          <p>
            Exclusive offer: Subscribe to our newsletter for special discounts
            and promotions
          </p>
        </div>
      </BannerSlider>
    </div>
  );
}

export default Banner;
