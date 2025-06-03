import { BrowserRouter, Routes, Route } from "react-router-dom";
import  ListarContas  from "../pages/ListarContas";
import  EditarConta  from "../pages/EditarContas";
// import { excluirConta } from "../services/contasServices";
import  CriarContas  from "../pages/CriarContas";;

export default function AppRoutes() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListarContas />} />
            <Route path="/cadastrar" element={<CriarContas />} />
            <Route path="/editar-conta/:id" element={<EditarConta />} />
          </Routes>
        </BrowserRouter>
      );
}