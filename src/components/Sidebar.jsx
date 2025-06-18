import React, { useState } from "react";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h3>Menu</h3>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="/">Contas</a></li>
        </ul>
      </aside>
    </>
  );
}
