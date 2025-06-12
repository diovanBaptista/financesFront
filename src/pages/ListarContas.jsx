import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaRegListAlt } from "react-icons/fa";

import BaseLayout from "../layouts/BaseLayout";
import ConfirmModal from "../components/ConfirmaModal";

import {
  getContas,
  excluirConta as excluirContaService,
} from "../services/contasServices";

import formatDateToDDMMYYYY from "../components/FormatData";
import "../styles/ListarContas.css";

import { toast, ToastContainer } from "react-toastify";  // IMPORTAÇÕES AQUI
import "react-toastify/dist/ReactToastify.css";

function ListarContas() {
  const [contas, setContas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [contaParaExcluir, setContaParaExcluir] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getContas().then((data) => setContas(data));

    // Lógica para mostrar notificação após redirecionamento
    const notifyOnLoad = localStorage.getItem("notifyOnLoad");
    if (notifyOnLoad === "successUpdate") {
      toast.success("Conta atualizada com sucesso!");
      localStorage.removeItem("notifyOnLoad");
    }
  }, []);

  const handleEditar = (id) => navigate(`/editar-conta/${id}`);

  const handleVerParcelas = (id) =>
    navigate(`/conta/${id}/parcelas`);

  const handleExcluirClick = (id) => {
    setContaParaExcluir(id);
    setModalAberto(true);
  };

  const confirmarExclusao = async () => {
    try {
      await excluirContaService(contaParaExcluir);
      setContas((prev) => prev.filter((c) => c.id !== contaParaExcluir));
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
    } finally {
      setModalAberto(false);
      setContaParaExcluir(null);
    }
  };

  return (
    <BaseLayout>
      <div className="contas-container">
        <div className="button-cadastrar">
          <h2>Contas</h2>

          <a href="/cadastrar" className="link-cadastrar">
            <button className="btn-cadastrar">Cadastrar</button>
          </a>
        </div>

        <table className="table" cellPadding="8">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Parcelas</th>
              <th>Opções</th>
            </tr>
          </thead>

          <tbody>
            {contas.map((conta) => (
              <tr key={conta.id}>
                <td data-label="Nome">{conta.name}</td>
                <td data-label="Valor">
                  {Number(conta.value).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td data-label="Data">{formatDateToDDMMYYYY(conta.date)}</td>

                <td data-label="Parcelas" className="opcaoe parcelas-col">
                  <div className="icon">
                    <FaRegListAlt
                      title="Ver Parcelas"
                      onClick={() => handleVerParcelas(conta.id)}
                    />
                  </div>
                </td>

                <td data-label="Opções" className="opcaoe">
                  <div className="icon">
                    <FaEdit title="Editar" onClick={() => handleEditar(conta.id)} />
                    <FaTrash
                      title="Excluir"
                      onClick={() => handleExcluirClick(conta.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={modalAberto}
        onCancel={() => setModalAberto(false)}
        onConfirm={confirmarExclusao}
      />

      <ToastContainer />
    </BaseLayout>
  );
}

export default ListarContas;
