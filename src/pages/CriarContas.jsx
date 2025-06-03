import React, { useState } from "react";
import BaseLayout from "../layouts/BaseLayout.jsx";
import { criarConta } from "../services/contasServices.js";
import "../styles/CriarContas.css"

const STATUS_CHOICES = [ 
    'Parte cadastro',
    'Parte financeira', 
    'Parte completada', 
];

export default function CriarConta() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      value: formData.value !== null && formData.value !== "" ? Number(formData.value) : null,
      owner: formData.owner !== null && formData.owner !== "" ? Number(formData.owner) : null,
    };

    try {
      const response = await criarConta(formData);
      console.log("Conta criada com sucesso:", response);
      setFormData({
        status: "",
        name: "",
        description: "",
        value: "",
        date: "",
        installments: false,
        due_date_day: "",
        installment_number: "",
        store: "",
        owner: "",
      });
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    }
  };

  return (
    <BaseLayout>
    <div className="fundo">
      <h2 className="titulo">Criar Conta</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group linha-dupla">
            <div className="coluna">
              <label>Nome:</label>
              <input name="name" type="text" value={formData.name} onChange={handleChange} required autoComplete="off" />
            </div>
            <div className="coluna">
              <label>Loja:</label>
              <input name="store" type="text" value={formData.store} onChange={handleChange} autoComplete="off" />
            </div>
          </div>

          <div className="form-group">
            <label>Descrição:</label>
            <textarea
              name="description"
              value={formData.description}
              autoComplete="off"
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-group linha-tripla">
            <div className="coluna">
              <label>Data:</label>
              <input name="date" type="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className="coluna">
              <label>Valor:</label>
              <input name="value" type="number" value={formData.value || ""} onChange={handleChange} autoComplete="off" />
            </div>
            <div className="coluna">
              <label>Status:</label>
              <input name="status" type="text" value={formData.status || "Parte cadastro"} readOnly />
            </div>
          </div>

          <button type="submit">Criar Conta</button>
        </form>
      </div>
      </div>
    </BaseLayout>
  );
}



