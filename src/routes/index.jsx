import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PasswordResetRequest from "../pages/PasswordResetRequest";
import PasswordResetConfirm from "../pages/PasswordResetConfirm";
import ListarContas from "../pages/ListarContas";
import EditarConta from "../pages/EditarContas";
import CriarContas from "../pages/CriarContas";
import ListarParcelas from "../pages/ListaParcelas";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import CadastroConraMensais from "../pages/CadastroContaMensais";
import CriaContaMensais from "../pages/CriarContaMensais";
import EditarContaMensal from "../pages/EditarContaMensais";
import ListarContaMensal from "../pages/ListaContaMensal";
import CadastrosContaMensais from "../pages/ContaMensalCadastro";


export default function AppRoutes() {
  return (
    <Routes>
      {/* Redireciona a raiz para a tela de login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<PasswordResetRequest />} />
      <Route path="/conta-mensais" element={<CadastroConraMensais />} />
      <Route path="/cadastro-conta-mensais" element={<CriaContaMensais />} />
      <Route path="/nova-conta-mensais" element={<CadastrosContaMensais />} />
      <Route path="/lista-conta-mensais" element={<ListarContaMensal />} />
      <Route path="/editar-conta-mensais/:id" element={<EditarContaMensal />} />
      <Route path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm />}
       />

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
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
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
