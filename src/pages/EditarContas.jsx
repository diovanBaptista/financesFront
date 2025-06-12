import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import { editarConta, getContas } from "../services/contasServices"; 
import "../styles/EditarConta.css"

export default function EditarConta() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    store: "",
    description: "",
    date: "",
    value: "",
    status: "",
    owner: "",
    installments: false,
    due_date_day: "",
    installment_number: "",
  });

  useEffect(() => {
    async function fetchConta() {
      try {
        // Sua API de getContas() retorna lista, então buscar o item pelo id:
        const contas = await getContas();
        const conta = contas.find((c) => c.id === Number(id));
        if (!conta) {
          alert("Conta não encontrada.");
          navigate("/");
          return;
        }

        // Convertendo data para input date (yyyy-mm-dd)
        const dateISO = conta.date ? new Date(conta.date).toISOString().substring(0, 10) : "";

        setFormData({
          ...conta,
          date: dateISO,
          installments: conta.installments || false,
          due_date_day: conta.due_date_day || "",
          installment_number: conta.installment_number || "",
          owner: conta.owner || "",
        });
      } catch (error) {
        alert("Erro ao carregar conta");
        console.error(error);
      }
    }

    if (id) fetchConta();
  }, [id, navigate]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await editarConta(formData.id, formData);
      alert("Conta atualizada com sucesso!");
      navigate("/");
    } catch (error) {
      alert("Erro ao atualizar conta.");
      console.error(error);
    }
  }

  return (
    <BaseLayout>
      <div className="contas-container">
        <h2 className="titulo">Editar Conta</h2>
        <div className="form-wrapper">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group linha-dupla">
            <div className="coluna">
                <label>Owner:</label>
                <input
                  name="owner"
                  type="text"
                  value={formData.owner}
                  readOnly
                />
              </div>
              <div className="coluna">
                <label>Nome:</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="coluna">
                <label>Loja:</label>
                <input
                  name="store"
                  type="text"
                  value={formData.store}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Descrição:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="form-group linha-tripla">
              <div className="coluna">
                <label>Data:</label>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="coluna">
                <label>Valor:</label>
                <input
                  name="value"
                  type="number"
                  value={formData.value || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="coluna">
                <label>Dia vencimento:</label>
                <input
                  name="due_date_day"
                  type="number"
                  value={formData.due_date_day}
                  onChange={handleChange}
                />
              </div>
              
            </div>


            <div className="form-group linha-tripla">
            <div className="coluna">
                <label>Parcelado?</label>
                <input
                  name="installments"
                  type="checkbox"
                  checked={formData.installments}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className="coluna">
                <label>Status:</label>
                <input
                  name="status"
                  type="text"
                  value={formData.status}
                  readOnly
                />
              </div>
              
              <div className="coluna">
                <label>Nº parcelas:</label>
                <input
                  name="installment_number"
                  type="number"
                  value={formData.installment_number}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              
            </div>

            
            <div className="button">
                <button
                    type="submit"
                    onClick={() => navigate(-1)}
                >
                    Voltar
                </button>
                <button type="submit">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
};



