import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";
import logo from "../assets/logocomercial.png";

function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/auth/users/reset_password/", {
        email,
      });
      toast.success("Link de recuperação enviado para seu e-mail.");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Erro ao enviar link. Verifique o e-mail.");
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
            <h2>Recuperar senha</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar link"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PasswordResetRequest;
