import axios from "axios";

const API_URL = "http://localhost:8000/api/accounts/accounts/";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Token e CSRF centralizados
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Se quiser forçar envio de CSRF (ex: para Django), descomente a linha abaixo
  // headers["X-CSRFToken"] = getCookie("csrftoken");

  return headers;
};

// Listar contas
export const getContas = async () => {
  const res = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// Criar nova conta
export const criarConta = async (dados) => {
  const headers = getAuthHeaders();
  console.log("[criarConta] Enviando dados:", dados);
  return axios.post(API_URL, dados, { headers });
};

// Editar conta existente
export const editarConta = async (id, dados) => {
  const headers = getAuthHeaders();
  console.log("[editarConta] Atualizando ID:", id, "com dados:", dados);
  return axios.put(`${API_URL}${id}/`, dados, { headers });
};

// Excluir conta
export const excluirConta = async (id) => {
  const headers = getAuthHeaders();
  return axios.delete(`${API_URL}${id}/`, { headers });
};

// Avançar etapa da conta
export const avancarConta = async (id) => {
  const headers = getAuthHeaders();
  return axios.get(`${API_URL}${id}/avancar/`, { headers });
};
