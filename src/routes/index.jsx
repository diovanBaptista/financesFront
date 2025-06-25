import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register"; // ⬅️ Novo import da tela de registro
import ListarContas from "../pages/ListarContas";
import EditarConta from "../pages/EditarContas";
import CriarContas from "../pages/CriarContas";
import ListarParcelas from "../pages/ListaParcelas";
import PrivateRoute from "../components/PrivateRoute"; // ⬅️ Protege as rotas logadas

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redireciona a raiz para a tela de login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas privadas */}
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
    </Routes>
  );
}
