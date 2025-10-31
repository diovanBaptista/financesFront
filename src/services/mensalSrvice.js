import axios from "axios";

const API_URL = "http://localhost:8000/api/accounts/conta_mensais/";


// Cabeçalhos com token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }


  return headers;
};

// Listar contas (com paginação opcional)
export const getContas = async (page = 1, page_size = 100) => {
  const res = await axios.get(API_URL, {
    headers: getAuthHeaders(),
    params: { page, page_size },
  });
  return res.data.results || res.data;
};

// Criar conta
export const criarConta = async (dados) => {
  const headers = getAuthHeaders();
  return axios.post(API_URL, dados, { headers });
};

// Editar conta existente
export const editarConta = async (id, dadosConta) => {
  const headers = getAuthHeaders();
  const url = `${API_URL}${id}/`;
  const response = await axios.put(url, dadosConta, { headers });
  return response.data;
};

// Excluir conta
export const excluirConta = async (id) => {
  const headers = getAuthHeaders();
  return axios.delete(`${API_URL}${id}/`, { headers });
};


export const pagarParcela = async (id) => {
  const res = await axios.get(`${API_URL}${id}/avancar/`);
  return res.data
}

