import React, { useState } from "react";
import BaseLayout from "../layouts/BaseLayout.jsx";
import { criarConta, avancarConta, editarConta } from "../services/contasServices.js";
import "../styles/CriarContas.css"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const STATUS_CHOICES = [ 
    'Parte cadastro',
    'Parte financeira', 
    'Parte completada', 
];


export default function CriarConta() {
  
  const notify = (message, type = "success") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    status: "Parte cadastro",
    name: "",
    description: "",
    value: "",
    date: "",
    installments: false,
    due_date_day: "",
    installment_number: null,
    store: "",
    owner: 2,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  const handleSubmitCadastro = async (e) => {
    e.preventDefault();
    try {
      // Cria payload com data formatada
      const payload = {
        ...formData,
        date: formData.data
          ? formData.data.toISOString().split("T")[0]
          : null,
      };

      if (!formData.id) {
        const res = await criarConta(payload);
        setFormData((prev) => ({
          ...prev,
          id: res.data.id,
          status: res.data.status || "Parte cadastro",
        }));
        notify("Cadastro criado com sucesso!", "success");
      } else {
        await editarConta(formData.id, payload);
        notify("Cadastro atualizado com sucesso!", "success");
      }
    } catch (error) {
      console.error("Erro ao salvar cadastro:", error);
      notify("Erro ao salvar cadastro.", "error");
    }
  };


  const handleAvancar = async () => {
    try {
      if (!formData.id) {
        notify("Conta ainda não foi criada.", "warning");
        return;
      }

      const res = await avancarConta(formData.id);

      setFormData((prev) => ({
        ...prev,
        ...res.data,
        data: res.data.date ? new Date(res.data.date) : null, // converte para Date
      }));
      notify("Avançado para etapa financeira com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao avançar etapa:", error);
      notify("Erro ao avançar etapa.", "error");
    }
  };


  const handleSubmitFinanceiro = async (e) => {
    e.preventDefault();
    try {
      if (!formData.id) {
        notify("Conta não criada ainda!", "warning");
        return;
      }
      await editarConta(formData.id, formData);
      notify("Dados financeiros salvos com sucesso!", "success");
      navigate("/contas");
    } catch (error) {
      console.error("Erro ao salvar financeiro:", error);
      notify("Erro ao salvar dados financeiros.", "error");
    }
  };

  return (
    <BaseLayout>
      <div className="contas-container">
        <h2 className="titulo">Criar Conta</h2>
        <div className="form-wrapper">
          <form
            onSubmit={formData.status === "Parte cadastro" ? handleSubmitCadastro : handleSubmitFinanceiro}
          >
            {formData.status === "Parte cadastro" && (
              <>
                <div className="form-group linha-dupla">
                  <div className="coluna">
                    <label>Nome:</label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="coluna">
                    <label>Loja:</label>
                    <input
                      name="store"
                      type="text"
                      value={formData.store}
                      onChange={handleChange}
                      autoComplete="off"
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
                    autoComplete="off"
                  />
                </div>

                <div className="form-group linha-tripla">
                  <div className="coluna">
                    <label>Data:</label>
                    <Calendar
                      name="data"
                      value={formData.data ? new Date(formData.data) : null}
                      onChange={(e) =>
                          setFormData((prev) => ({
                          ...prev,
                          data: e.value,
                          }))
                      }
                      dateFormat="yy-mm-dd"
                      showIcon
                      placeholder="Selecione a data"
                      className="border rounded "
                    />
                  </div>
                  <div className="coluna">
                    <label>Valor:</label>
                    <input
                      name="value"
                      type="number"
                      value={formData.value || ""}
                      onChange={handleChange}
                      autoComplete="off"
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
                </div>

                {!formData.id && (
                    <button type="submit">Salvar Cadastro</button>
                  )}
                  {formData.id && (
                    <button type="button" onClick={handleAvancar} style={{ marginLeft: "10px" }}>
                      Avançar para Parte Financeira
                    </button>
                  )}
              </>
            )}

            {formData.status === "Parte financeira" && (
              <>
                <div className="form-group linha-tripla">
                  <div className="coluna">
                    <label>Parcelado?</label>
                    <input
                      name="installments"
                      type="checkbox"
                      checked={formData.installments}
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
                  <div className="coluna">
                    <label>Nº parcelas:</label>
                    <input
                      name="installment_number"
                      type="number"
                      value={formData.installment_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button type="submit">Salvar Financeiro e Finalizar</button>
              </>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </BaseLayout>
  );
}



