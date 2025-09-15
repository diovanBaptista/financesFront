import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // <-- import useParams
import { toast } from "react-toastify";
import BaseLayout from "../layouts/BaseLayout";
import { editarConta, getContas } from "../services/contaMensaisServices";

export default function EditarContaMensal() {
  const [formData, setFormData] = useState({ nome: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams(); // <-- pega o id da URL
  const idConta = Number(id);  // transforma em número

  useEffect(() => {
    async function fetchConta() {
      try {
        const contas = await getContas();
        const contasArray = Array.isArray(contas) ? contas : [];
        
        const conta = contasArray.find((c) => c.id === idConta);
        if (!conta) {
          toast.error("Conta não encontrada.");
          navigate("/contas");
          return;
        }

        setFormData({ nome: conta.nome });
      } catch (error) {
        toast.error("Erro ao carregar conta.");
        console.error(error);
      }
    }

    if (idConta) fetchConta();

    const notifyOnLoad = localStorage.getItem("notifyOnLoad");
    if (notifyOnLoad === "successUpdate") {
      toast.success("Conta atualizada com sucesso!");
      localStorage.removeItem("notifyOnLoad");
    }
  }, [idConta, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome.trim()) {
      setMessage("O nome não pode estar vazio!");
      return;
    }

    try {
      await editarConta(idConta, formData);
      setMessage("Conta editada com sucesso!");
      toast.success("Conta editada com sucesso!");
      navigate("/conta-mensais");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Erro ao editar conta!");
      toast.error(err.message || "Erro ao editar conta!");
    }
  };

  return (
    <BaseLayout>
      <div className="contas-container">
        <h2 className="titulo">Editar Conta Mensal</h2>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group linha-dupla">
              <div className="coluna">
                <label>Nome:</label>
                <input
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="button">
              <button type="button" onClick={() => navigate(-1)}>
                Voltar
              </button>
              <button type="submit">Salvar Alterações</button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </BaseLayout>
  );
}
