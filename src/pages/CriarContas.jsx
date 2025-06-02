import React, { useState } from "react";
import BaseLayout from "../layouts/BaseLayout.jsx";
import { criarConta } from "../services/contasServices.js";

const STATUS_CHOICES = [ 
    'Parte cadastro',
    'Parte financeira', 
    'Parte completada', 
];

export default function CriarConta() {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <h2>Criar Conta</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Status:</label>
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="">-- Selecione --</option>
              {STATUS_CHOICES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Nome:</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Descrição:</label>
            <input name="description" type="text" value={formData.description} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Valor:</label>
            <input name="value" type="number" value={formData.value || ""} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Data:</label>
            <input name="date" type="date" value={formData.date} onChange={handleChange} />
          </div>

          <div className="form-group checkbox-group">
            <label>Parcelas:</label>
            <input name="installments" type="checkbox" checked={formData.installments} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Dia do vencimento:</label>
            <input name="due_date_day" value={formData.due_date_day} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Número da parcela:</label>
            <input
              name="installment_number"
              type="number"
              value={formData.installment_number || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Loja:</label>
            <input name="store" value={formData.store} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Owner (ID):</label>
            <input name="owner" type="number" value={formData.owner || ""} onChange={handleChange} />
          </div>

          <button type="submit">Criar Conta</button>
        </form>
      </div>
    </BaseLayout>
  );
}



