import { useEffect, useState } from "react";
import {getContas} from "../services/contasServices"
import BaseLayout from "../layouts/BaseLayout";
import "../styles/ListarContas.css"


function ListarContas() {
    const [contas, setContas] = useState([]);

    useEffect(() => {
        getContas().then((data) => {
          console.log("Dados recebidos da API:", data); // <-- isso vai mostrar os dados
          setContas(data);
        });
      }, []);

    // useEffect(() =>{
    //     getContas().then(data);
    // },[])

    return (
      <BaseLayout>
        <div className="contas-container">
          <h2>Contas</h2>
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {contas.map((conta) => (
                <tr key={conta.id}>
                  <td>{conta.name}</td>
                  <td>{conta.value}</td>
                  <td>{conta.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BaseLayout>
    );
}

export default ListarContas;
