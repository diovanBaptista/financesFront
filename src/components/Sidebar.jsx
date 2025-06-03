import React from "react";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="/">Contas</a></li>
        <li><a href="#">Relatórios</a></li>
      </ul>
    </aside>
  );
}
