import { BrowserRouter, Routes, Route } from "react-router-dom";
import  ListarContas  from "../pages/ListarContas";
import  EditarConta  from "../pages/EditarContas";
import  CriarContas  from "../pages/CriarContas";
import ListarParcelas from "../pages/ListaParcelas";

export default function AppRoutes() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListarContas />} />
            <Route path="/cadastrar" element={<CriarContas />} />
            <Route path="/editar-conta/:id" element={<EditarConta />} />
            <Route path="/conta/:id/parcelas" element={<ListarParcelas />} />
          </Routes>
        </BrowserRouter>
      );
}