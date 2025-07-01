import axios from "axios";

const API_URL = "http://localhost:8000/api/accounts/accounts/"; // ajuste se necessário

// CSRF (opcional para integração com Django)
// function getCookie(name) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== "") {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.substring(0, name.length + 1) === name + "=") {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }

// Cabeçalhos com token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // headers["X-CSRFToken"] = getCookie("csrftoken"); // Descomente se usar CSRF

  return headers;
};

// Listar contas (com paginação opcional)
export const getContas = async (page = 1, page_size = 100) => {
  const res = await axios.get(API_URL, {
    headers: getAuthHeaders(),
    params: { page, page_size },
  });
  return res.data.results || res.data; // compatível com paginação ou lista direta
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

// Avançar status da conta (caso use workflow)
export const avancarConta = async (id) => {
  const headers = getAuthHeaders();
  return axios.get(`${API_URL}${id}/avancar/`, { headers });
};
