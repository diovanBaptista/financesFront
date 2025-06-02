import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Base.css";

export default function BaseLayout({ children }) {
  return (
    <div className="page-container">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
}
