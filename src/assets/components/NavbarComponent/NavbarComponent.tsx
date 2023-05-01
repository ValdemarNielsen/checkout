import "./NavbarComponent.css";
export default function Navbar() {
  return (
    <nav className="nav">
      <div>
        <img src="public/favicon.ico" alt="" className="faviconimg" />
        <span style={{ fontWeight: "bold", fontSize: "3rem" }}>
          THE PROTEIN STORE
        </span>
      </div>
      <ul style={{ fontWeight: "normal", fontSize: "1rem" }}>
        <li>STORE</li>
        <li>NEW ARRIVALS</li>
        <li>ABOUT</li>
        <li>CONTACT</li>
      </ul>
    </nav>
  );
}
