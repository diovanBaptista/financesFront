import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaRegListAlt } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import BaseLayout from "../layouts/BaseLayout";
import ConfirmModal from "../components/ConfirmaModal";

import {
  getContas,
  excluirConta as excluirContaService,
} from "../services/contasServices";

import formatDateToDDMMYYYY from "../components/FormatData";
import "../styles/ListarContas.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListarContas() {
  const [contas, setContas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [contaParaExcluir, setContaParaExcluir] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    carregarContas();
  }, [page]);

  const carregarContas = async () => {
    try {
      const data = await getContas(page, pageSize);
      setContas(data.results);
      setTotalCount(data.count);
    } catch (err) {
      console.error("Erro ao buscar contas:", err);
      setContas([]);
    }

    // Notificação após redirecionamento (exemplo)
    const notifyOnLoad = localStorage.getItem("notifyOnLoad");
    if (notifyOnLoad === "successUpdate") {
      toast.success("Conta atualizada com sucesso!");
      localStorage.removeItem("notifyOnLoad");
    }
  };

  const handleEditar = (id) => navigate(`/editar-conta/${id}`);

  const handleVerParcelas = (id) => navigate(`/conta/${id}/parcelas`);

  const handleExcluirClick = (id) => {
    setContaParaExcluir(id);
    setModalAberto(true);
  };

  const confirmarExclusao = async () => {
    try {
      await excluirContaService(contaParaExcluir);
      // Após excluir, recarregar página atual para manter paginação correta
      carregarContas();
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      toast.error("Erro ao excluir conta.");
    } finally {
      setModalAberto(false);
      setContaParaExcluir(null);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPages) {
      setPage(novaPagina);
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


      <div className="table-container">
        <table className="table" cellPadding="8">
          <thead>
            <tr>
              <th className="coluna-nome">Nome</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Parcelas</th>
              <th>Opções</th>
            </tr>
          </thead>

          <tbody>
            {contas.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Nenhuma conta encontrada.
                </td>
              </tr>
            ) : (
              contas.map((conta) => (
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
              ))
            )}
          </tbody>
        </table>
        </div>

        <div className="paginacao">
          {/* Seta para voltar */}
          {page > 1 && (
            <button
              onClick={() => handlePageChange(page - 1)}
              style={{
                marginRight: 10,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              title="Página anterior"
            >
              <HiChevronLeft size={24} color="black" />
            </button>
          )}

          <span>
            {page} de {totalPages}
          </span>

          {/* Seta para avançar */}
          {page < totalPages && (
            <button
              onClick={() => handlePageChange(page + 1)}
              style={{
                marginLeft: 10,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              title="Próxima página"
            >
              <HiChevronRight size={24} color="black" />
            </button>
          )}
        </div>
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
