import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/auth/jwt/create/", {
        username: email,
        password: senha,
      });

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refresh", refreshToken);

      toast.success("Login realizado com sucesso!");
      console.log('deu bom')
      navigate("/contas");

    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Credenciais inválidas ou erro no servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="logo">
          <p>_LOGO_</p>
        </div>

        <div className="container-form">
          <form className="form" onSubmit={handleLogin}>
            <h2>Bem-vindo</h2>

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

            <span><a href="#">Esqueci minha senha</a></span>

            <button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <p>Não possui conta? <a href="#">Registre-se</a></p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
