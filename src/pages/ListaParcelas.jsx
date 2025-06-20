import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import "../styles/ListarParcelas.css";
import { getParcelas, getContaPorId, pagarParcela } from "../services/parcelaServices";
import formatDateToDDMMYYYY from "../components/FormatData";
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListarParcelas() {
  const { id } = useParams(); // ID da parcela
  const [parcelas, setParcelas] = useState([]);
  const [nomeConta, setNomeConta] = useState("");
  const navigate = useNavigate();

  // Para reutilizar carregar dados
  async function carregarDados() {
    try {
      const parcelasDaConta = await getParcelas(id);
      const parcelaPrincipal = parcelasDaConta[0];

      if (!parcelaPrincipal || !parcelaPrincipal.accounts) {
        throw new Error("Conta não encontrada nas parcelas");
      }

      const idConta = parcelaPrincipal.accounts;

      const parcelasData = await getParcelas(idConta);
      const contaData = await getContaPorId(idConta);

      setParcelas(parcelasData);
      setNomeConta(contaData.name);
    } catch (err) {
      console.error("Erro ao carregar dados da conta/parcelas:", err);
    }
  }

  useEffect(() => {
    carregarDados();
  }, [id]);

  const handlePagarParcela = async (idParcela) => {
    try {
      await pagarParcela(idParcela);

      // Atualiza os dados na tela sem reload
      await carregarDados();

      // Mostra notificação de sucesso
      toast.success("Parcela paga com sucesso!");
    } catch (error) {
      console.error("Erro ao pagar parcela:", error);
      toast.error("Erro ao pagar parcela. Tente novamente.");
    }
  };

  const isBotaoAtivo = (parcela) => {
    if (parcela.status === "Pago") return false;

    const hoje = new Date();
    const vencimento = new Date(parcela.maturity);

    const mesmoMesEAno =
      vencimento.getMonth() === hoje.getMonth() &&
      vencimento.getFullYear() === hoje.getFullYear();

    const mesAnterior =
      vencimento < hoje &&
      (vencimento.getMonth() !== hoje.getMonth() ||
        vencimento.getFullYear() !== hoje.getFullYear());

    return mesmoMesEAno || mesAnterior;
  };

  const calcularTotalPago = (parcelas) => {
    return parcelas
      .filter((p) => p.status === "Pago")
      .reduce((total, p) => total + Number(p.installment_value || 0), 0);
  };

  const calcularTotalAFaltar = (parcelas) => {
    return parcelas
      .filter((p) => p.status !== "Pago")
      .reduce((total, p) => total + Number(p.installment_value || 0), 0);
  };

  const obterUltimoMes = (parcelas) => {
    if (parcelas.length === 0) return "Sem parcelas";
    const ultimaData = parcelas.reduce((maisRecente, p) => {
      const data = new Date(p.maturity);
      return data > maisRecente ? data : maisRecente;
    }, new Date(0));

    return ultimaData.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  };

  return (
    <BaseLayout>
      <div className="contas-container">
        <div className="button-cadastrar">
          <h2>Parcelas da Conta {nomeConta || `#${id}`}</h2>
          <button className="btn-cadastrar" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>

        <div className="insights">
          <div className="result pago">
            <div className="tag-p">
              <FaCheckCircle style={{ fontSize: '1.5rem', marginRight: "15px", color: "#28a745" }} />
              <div className="componente_card">
                <strong>Total pago: </strong>
                {calcularTotalPago(parcelas).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                <div>
                </div>
              </div>
            </div>
          </div>

          <div className="result nao_pago">
            <div className="tag-p">
              <FaTimesCircle style={{ fontSize: '1.5rem', marginRight: "15px", color: "#dc3545" }} />
              <div className="componente_card">
                <strong>Total a pagar: </strong>
                {calcularTotalAFaltar(parcelas).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                <div>
                </div>
              </div>
            </div>
          </div>

          <div className="result ultimo_mes">
            <div className="tag-p">
              <FaCalendarAlt style={{ fontSize: '1.5rem', marginRight: "15px", color: "#007bff" }} />
              <div className="componente_card">
                <strong>Última parcela: </strong>
                {obterUltimoMes(parcelas)}
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <table className="table" cellPadding="8">
          <thead>
            <tr>
              <th>Status</th>
              <th>Valor da Parcela</th>
              <th>Vencimento</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {parcelas.length === 0 ? (
              <tr>
                <td colSpan="4">Nenhuma parcela encontrada.</td>
              </tr>
            ) : (
              parcelas.map((parcela, index) => (
                <tr key={index}>
                  <td data-label="Status">{parcela.status || "Não informado"}</td>
                  <td data-label="Valor">
                    {parcela.installment_value
                      ? Number(parcela.installment_value).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                      : "R$ 0,00"}
                  </td>
                  <td data-label="Vencimento">
                    {parcela.maturity
                      ? formatDateToDDMMYYYY(parcela.maturity)
                      : "Sem data"}
                  </td>
                  <td>
                    <button
                      onClick={() => handlePagarParcela(parcela.id)}
                      disabled={parcela.status === "Pago" || !isBotaoAtivo(parcela)}
                      className={
                        parcela.status === "Pago"
                          ? "btn-pago"
                          : isBotaoAtivo(parcela)
                            ? "btn-pagar"
                            : "btn-inativo"
                      }
                    >
                      {parcela.status === "Pago" ? "Pago" : "Pagar"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Toast container para exibir notificações */}
      <ToastContainer position="top-right" autoClose={3000} />
    </BaseLayout>
  );
}

export default ListarParcelas;
