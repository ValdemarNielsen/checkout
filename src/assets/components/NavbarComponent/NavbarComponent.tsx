import React from "react";
import "./NavbarComponent.css";

function NavbarComponent() {
  const disableLinkOnClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    return false;
  };

  return (
    <div className="headerstyle">
      <div className="headertitlestyle">
        {/* Insert an image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/563/563777.png"
          className="logo-image"
        />
        THE PROTEIN STORE
      </div>
      <div className="headerlistyle">
        <ul>
          <li>
            <a href="#" onClick={disableLinkOnClick}>
              STORE
            </a>
          </li>
          <li>
            <a href="#" onClick={disableLinkOnClick}>
              NEW ARRIVALS
            </a>
          </li>
          <li>
            <a href="#" onClick={disableLinkOnClick}>
              ABOUT
            </a>
          </li>
          <li>
            <a href="#" onClick={disableLinkOnClick}>
              CONTACT
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarComponent;
