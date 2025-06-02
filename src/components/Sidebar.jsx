import React from "react";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="http://localhost:5173/nova">Cria Contas</a></li>
        <li><a href="http://localhost:5173/">Contas</a></li>
        <li><a href="#">Relatórios</a></li>
      </ul>
    </aside>
  );
}
