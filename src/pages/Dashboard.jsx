import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "../layouts/BaseLayout.jsx";
import "../styles/Dashboard.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function Dashboard() {
  const [insightsData, setInsightsData] = useState(null);
  const [graficoData, setGraficoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Insights
        const insightsRes = await axios.get(
          "http://localhost:8000/api/home/profile/2/dashboard/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInsightsData(insightsRes.data);

        // Contas
        const contasRes = await axios.get(
          "http://localhost:8000/api/home/profile/2/grafico_contas/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Entradas
        const entradasRes = await axios.get(
          "http://localhost:8000/api/home/profile/2/grafico_entradas/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(entradasRes)

        const mergedData = contasRes.data.map((conta, index) => ({
          mes: conta.mes,
          contas: conta.total,
          entradas: entradasRes.data[index]?.entradas || 0
        }));

        setGraficoData(mergedData);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard", error);
      }
    };

    fetchData();
  }, []);

  const insights = insightsData
    ? [
        {
          label: "Entradas",
          value: `R$ ${insightsData.valor_entradas_mensal.toFixed(2)}`,
          status: "entrada",
        },
        {
          label: "Contas Pagas",
          value: `R$ ${insightsData.valor_conta_mensal_pago.toFixed(2)}`,
          status: "pago",
        },
        {
          label: "Falta Pagar",
          value: `R$ ${insightsData.valor_conta_mensal_falta_pagar.toFixed(2)}`,
          status: "nao_pago",
        },
        {
          label: "Total de Contas",
          value: `R$ ${insightsData.valor_conta_mensal.toFixed(2)}`,
          status: "totalConta",
        },
      ]
    : [];

  return (
    <BaseLayout>
      <div className="contas-container">
        <h1 className="texto">Dashboard Financeiro</h1>

        {/* Insights */}
        <div className="insights">
          {insights.map((insight, index) => (
            <div key={index} className={`result ${insight.status}`}>
              <strong className="tag-p">{insight.label}</strong>
              <div className="result">{insight.value}</div>
            </div>
          ))}
        </div>

        <h2 className="subtitulo">Grafico Anual</h2>

        {/* Gráfico */}
        <div  style={{ width: "100%", height: 300, marginTop: "10px" }}>
          <ResponsiveContainer>
            <LineChart data={graficoData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip
                formatter={(value) => `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
              />
              <Legend />
              <Line type="monotone" dataKey="contas" stroke="#dc323279" strokeWidth={2} name="Contas" />
              <Line type="monotone" dataKey="entradas" stroke="#387908" strokeWidth={2} name="Entradas" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </BaseLayout>
  );
}
