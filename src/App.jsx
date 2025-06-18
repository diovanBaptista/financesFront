import React from "react";
import AppRoutes from "./routes/index.jsx"; // ou onde estiver seu arquivo de rotas
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
