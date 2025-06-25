import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css"; // pode reaproveitar o mesmo CSS
import logo from "../assets/logocomercial.png";


function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:8000/auth/users/", {
        username: email,
        email: email,
        password: senha,
        re_password:senha,

      });

      toast.success("Cadastro realizado com sucesso!");
      navigate("/login"); // redireciona para o login
    } catch (error) {
      console.error("Erro no cadastro:", error.response?.data || error.message);
      toast.error("Erro ao registrar. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="logo">
          <img  src={logo} alt="Logo" className="logo-img" />
        </div>

        <div className="container-form">
          <form className="form" onSubmit={handleRegister}>
            <h2>Crie sua conta</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
            />

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              maxLength={16}
              required
            />

            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirmar senha"
              maxLength={16}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrar"}
            </button>

            <p>Já tem conta? <a href="/login">Entrar</a></p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
