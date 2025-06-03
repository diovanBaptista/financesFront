import { useEffect, useState } from "react";
import {getContas} from "../services/contasServices"
import BaseLayout from "../layouts/BaseLayout";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/ListarContas.css"
import { excluirConta as excluirContaService } from "../services/contasServices";
import "../components/ConfirmaModal"
import ConfirmModal from "../components/ConfirmaModal";



function ListarContas() {
    const [contas, setContas] = useState([]);

    useEffect(() => {
        getContas().then((data) => {
          console.log("Dados recebidos da API:", data); // <-- isso vai mostrar os dados
          setContas(data);
        });
      }, []);



      const [modalAberto, setModalAberto] = useState(false);
      const [contaParaExcluir, setContaParaExcluir] = useState(null);

      const handleExcluirClick = (id) => {
        setContaParaExcluir(id);
        setModalAberto(true);
      };

      const confirmarExclusao = async () => {
        try {
          await excluirContaService(contaParaExcluir);
          setContas((prevContas) =>
            prevContas.filter((conta) => conta.id !== contaParaExcluir)
          );
          setModalAberto(false);
          setContaParaExcluir(null);
        } catch (error) {
          console.error("Erro ao excluir conta:", error);
          setModalAberto(false);
          setContaParaExcluir(null);
        }
      };
      

    return (
      <BaseLayout>
        <div className="contas-container">
          <div className="button-cadastrar">
          <h2>Contas</h2>
          <span>
            <a href="/cadastrar">
            <button>
              Cadastrar
            </button>
            </a>
          </span>
          </div>
          <table className="table" border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {contas.map((conta) => (
                <tr key={conta.id}>
                  <td>{conta.name}</td>
                  <td>{conta.value}</td>
                  <td>{conta.date}</td>
                  <td className="opcaoe">
                    <div className="icon">
                      <FaEdit
                        onClick={() => editarConta(conta.id)}
                        style={{ color: "#36304A", cursor: "pointer", marginRight: '12px' }}
                        title="Editar"
                      />
                    </div>
                    <div className="icon">
                      <FaTrash
                        onClick={() => handleExcluirClick(conta.id)}
                        style={{ color: "#36304A", cursor: "pointer" }}
                        title="Excluir"
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
      </BaseLayout>
    );
}

export default ListarContas;
