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
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/contas">Contas</a></li>
          <li><a href="/conta-mensais">Tipo Conta Mensais</a></li>
          <li><a href="/lista-conta-mensais">Conta Mensais</a></li>
          <li><a href="#">Entrada</a></li>
        </ul>
      </aside>
    </>
  );
}
