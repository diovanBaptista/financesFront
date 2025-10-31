import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BaseLayout from "../layouts/BaseLayout";
import { criarConta } from "../services/mensalSrvice"; // ajuste o nome do arquivo se necessário
import { getContas } from "../services/contaMensaisServices";
// import { Calendar } from 'primereact/calendar';

export default function CadastrosContaMensais() {
  const [formData, setFormData] = useState({
    status: "Nao Pago",
    valor: "",
    data: "",
    conta: "",
    owner: "2",
  });

  const [contas, setContas] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const carregarContas = async () => {
      try {
        const data = await getContas(); // usa o serviço que você já tem
        setContas(data); // salva as contas retornadas
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
        toast.error("Erro ao carregar lista de contas.");
      }
    };

    carregarContas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await criarConta(formData);
      toast.success("Conta criada com sucesso!");

      // Limpa o formulário após salvar
      setFormData({
        status: "",
        valor: "",
        data: "",
        conta: "",
        owner: "",
      });

      // Recarrega a página após 1 segundo (ou redireciona)
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error("Erro ao criar conta:", error);
      toast.error("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <BaseLayout>
      <div className="contas-container">
        <h2 className="texto">Cadastrar Conta Mensal</h2>
        <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
        <div className="coluna">
          {/* 🔹 SELECT com as contas carregadas via getContas */}
          <select
            name="conta"
            value={formData.conta}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Selecione a conta</option>
            {contas.map((conta) => (
              <option key={conta.id} value={conta.id}>
                {conta.nome}
              </option>
            ))}
          </select>
          </div>
          <div className="coluna">
          
          <input
            type="number"
            name="valor"
            placeholder="Valor"
            value={formData.valor}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          </div>

          <div className="coluna">
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          </div>

          </div>

          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            Salvar Conta
          </button>
        </form>
        </div>
      </div>
    </BaseLayout>
  );
}
