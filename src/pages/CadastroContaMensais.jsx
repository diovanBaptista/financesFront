import { useEffect, useState } from "react";
import BaseLayout from "../layouts/BaseLayout";
import { FaEdit, FaTrash, FaRegListAlt } from "react-icons/fa";
import '../styles/CadastroContaMensais.css'
import ConfirmModal from "../components/ConfirmaModal";
import { useNavigate } from "react-router-dom";
import {
  excluirConta as excluirContaService,
} from "../services/contaMensaisServices";



export default function CadastroConraMensais() {
   const navigate = useNavigate();

    const [tiposConta, setTiposConta] = useState([]);
    const [loading, setLoading] = useState(true); // opcional
    const [error, setError] = useState(null);     // opcional

    const [contaParaExcluir, setContaParaExcluir] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    const handleExcluirClick = (id) => {
    setContaParaExcluir(id);
    setModalAberto(true);
  };

    const handleEditar = (id) => navigate(`/editar-conta-mensais/${id}`);


  const confirmarExclusao = async () => {
      try {
        await excluirContaService(contaParaExcluir);
        carregarContas();
      } catch (err) {
        console.error("Erro ao excluir conta:", err);
        toast.error("Erro ao excluir conta.");
      } finally {
        setModalAberto(false);
        setContaParaExcluir(null);
      }
    };


    useEffect(() => {
        async function fetchTiposConta() {
        try {
            const response = await fetch("http://localhost:8000/api/accounts/tipo_conta/");
            if (!response.ok) {
            throw new Error(`Erro ao buscar tipos de conta: ${response.status}`);
            }
            const data = await response.json();
            setTiposConta(data);
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar os tipos de conta");
        } finally {
            setLoading(false);
        }
        }

        fetchTiposConta();
    }, []);

    return (
    <BaseLayout>
      <div className="contas-container">
        <div className="button-cadastrar">
          <h1 className="texto">Contas Mensais</h1>
          <a href="/cadastro-conta-mensais">
          <button className="btn-cadastrar">Cadastrar</button>
          </a>
        </div>
        <div className="table-container">
          <table className="table" cellPadding="8">
            <thead>
              <tr>
                <th>Nome</th>
                <th className="opcao">Opções</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="2">Carregando...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="2">{error}</td>
                </tr>
              ) : tiposConta.length > 0 ? (
                tiposConta.map((tipo) => (
                  <tr key={tipo.id}>
                    <td>{tipo.nome}</td>
                    <td className="opcao">
                      <div className="icon">
                            <FaEdit title="Editar" onClick={() => handleEditar(tipo.id)} />
                            <FaTrash
                            title="Excluir"
                            onClick={() => handleExcluirClick(tipo.id)}
                            />
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Nenhum tipo de conta encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal
        isOpen={modalAberto}
        onCancel={() => setModalAberto(false)}
        onConfirm={confirmarExclusao}
      />
    </BaseLayout>
  );
}