import { useState } from "react";
import BaseLayout from "../layouts/BaseLayout";


export default function CriaContaMensais() {

    const [formData, setFormData] = useState({
        nome:''
    })

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/accounts/tipo_conta/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Conta criada com sucesso!");
        setFormData({ nome: "" }); // limpa o campo
      } else {
        const errorData = await response.json();
        console.error("Erro:", errorData);
        alert("Erro ao criar conta!");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor!");
    }
  };


    return(
        <BaseLayout>
        <div className="contas-container">
        <h2 className="titulo">Criar Tipo de Conta Mensal</h2>
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


               
             <button type="submit">Salvar Conta</button>
                 
          
            
          </form>
        </div>
      </div>
        </BaseLayout>
    )
}
