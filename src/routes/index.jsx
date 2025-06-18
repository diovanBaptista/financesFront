import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ListarContas from "../pages/ListarContas";
import EditarConta from "../pages/EditarContas";
import CriarContas from "../pages/CriarContas";
import ListarParcelas from "../pages/ListaParcelas";
import PrivateRoute from "../components/PrivateRoute"; // ajuste o caminho conforme seu projeto

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redireciona da raiz para /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rota pública */}
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas */}
      <Route
        path="/contas"
        element={
          <PrivateRoute>
            <ListarContas />
          </PrivateRoute>
        }
      />

      <Route
        path="/cadastrar"
        element={
          <PrivateRoute>
            <CriarContas />
          </PrivateRoute>
        }
      />

      <Route
        path="/editar-conta/:id"
        element={
          <PrivateRoute>
            <EditarConta />
          </PrivateRoute>
        }
      />

      <Route
        path="/conta/:id/parcelas"
        element={
          <PrivateRoute>
            <ListarParcelas />
          </PrivateRoute>
        }
      />

      {/* Se quiser uma página home protegida */}
      {/* <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      /> */}
    </Routes>
  );
}
