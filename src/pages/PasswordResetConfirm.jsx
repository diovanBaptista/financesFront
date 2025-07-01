import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";
import logo from "../assets/logocomercial.png";

function PasswordResetConfirm() {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== reNewPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:8000/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: newPassword,
        re_new_password: reNewPassword,
      });

      toast.success("Senha alterada com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Erro ao alterar a senha. Link pode estar expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <div className="container-form">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Nova senha</h2>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nova senha"
              maxLength={16}
              required
            />

            <input
              type="password"
              value={reNewPassword}
              onChange={(e) => setReNewPassword(e.target.value)}
              placeholder="Confirmar nova senha"
              maxLength={16}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Alterando..." : "Alterar senha"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PasswordResetConfirm;
