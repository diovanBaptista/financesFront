import axios from "axios";

const API_URL = "http://localhost:8000/api/accounts/accounts/";


export const getContas = async () => {
    const res = await axios.get(API_URL);
    return res.data
};


export const criarConta = async (dados) => {
    return axios.post(API_URL,dados)
};

export const editarConta = async (id, dados) => {
    return axios.put(`${API_URL}${id}`,dados)
};

export const excluirConta = async (id) => {
    const token = localStorage.getItem("token"); // ou sessionStorage, ou um contexto
  
    return axios.delete(`${API_URL}${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,}})
};