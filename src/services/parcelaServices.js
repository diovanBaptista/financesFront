// src/services/parcelaServices.js
import axios from "axios";

const API_URL_INSTALLMENTS = "http://localhost:8000/api/accounts/installments/";
const API_URL_ACCOUNTS = "http://localhost:8000/api/accounts/accounts/";

// Buscar parcelas da conta
export const getParcelas = async (contaId) => {
  const res = await axios.get(`${API_URL_INSTALLMENTS}?accounts=${contaId}`);
  return res.data;
};

// Buscar dados da conta para obter o nome
export const getContaPorId = async (contaId) => {
  const res = await axios.get(`${API_URL_ACCOUNTS}${contaId}/`);
  return res.data;
};


export const pagarParcela = async (id) => {
  const res = await axios.get(`${API_URL_INSTALLMENTS}${id}/parcela_paga/`);
  return res.data
}