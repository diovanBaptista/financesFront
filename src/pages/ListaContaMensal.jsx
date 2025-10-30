import { useState, useEffect } from "react";
import BaseLayout from "../layouts/BaseLayout";
import { getContas } from "../services/mensalSrvice";
import { toast } from "react-toastify";
import { MdRequestQuote } from "react-icons/md";
import formatDateToDDMMYYYY from "../components/FormatData";

export default function ListarContaMensal() {
  const [contas, setContas] = useState([]);       // 👈 adiciona state
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);           // se precisar de paginação
  const [pageSize, setPageSize] = useState(10);

  const carregarContas = async () => {
    try {
      const data = await getContas(page, pageSize);

      const contasRecebidas = Array.isArray(data.results)
        ? data.results
        : Array.isArray(data)
        ? data
        : [];

      const total = data.count || contasRecebidas.length || 0;

      const agora = new Date()
      const mesAtual = agora.getMonth();
      const anoAtual = agora.getFullYear();

      const contasOrdenadas = contasRecebidas.sort((a, b) => {
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);

        const ehMesAtualA =
          dataA.getMonth() === mesAtual && dataA.getFullYear() === anoAtual;
        const ehMesAtualB =
          dataB.getMonth() === mesAtual && dataB.getFullYear() === anoAtual;

        if (ehMesAtualA && !ehMesAtualB) return -1;
        if (!ehMesAtualA && ehMesAtualB) return 1;

        return dataB - dataA;
      });

      setContas(contasOrdenadas);
      setTotalCount(total);
    } catch (err) {
      console.error("Erro ao buscar contas:", err);
      toast.error("Erro ao carregar contas.");
      setContas([]);
      setTotalCount(0);
    }

    const notifyOnLoad = localStorage.getItem("notifyOnLoad");
    if (notifyOnLoad === "successUpdate") {
      toast.success("Conta atualizada com sucesso!");
      localStorage.removeItem("notifyOnLoad");
    }
  };

  // 👇 chama carregarContas quando o componente montar
  useEffect(() => {
    carregarContas();
  }, [page, pageSize]);

  return (
    <BaseLayout>
      <div className="contas-container">
        <div className="button-cadastrar">
          <h1 className="texto">Contas Mensais</h1>
          <a href="#" className="link-cadastrar">
            <button className="btn-cadastrar">Cadastrar</button>
          </a>
        </div>

        <div className="table-container">
          <table className="table" cellPadding="8">
            <thead>
              <tr>
                <th>Conta</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Data</th>
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
                    <td data-label="Nome">{conta.conta_name}</td>
                      <td data-label="Parcelas" className="opcaoe parcelas-col">
                        {conta.status}
                      </td>
                    <td data-label="Valor">
                      {Number(conta.valor).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td data-label="Data">{formatDateToDDMMYYYY(conta.data)}</td>
                    <td data-label="Opções" className="opcaoe">
                      <div className="icon">
                        <MdRequestQuote title="Pagar Conta" onClick={() => handleEditar(conta.id)} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </BaseLayout>
  );
}
