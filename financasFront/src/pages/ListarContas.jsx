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
            <ul>
              {contas.map((conta) => (
                <li key={conta.id}>{conta.name}</li>
              ))}
            </ul>
          </div>
        </BaseLayout>
      );
    }

export default ListarContas;
