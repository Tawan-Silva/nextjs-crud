import { useState } from "react";
import Cliente from "../core/Cliente";
import { FormularioProps } from "../model/FormularioProps";
import Botao from "./Botao";
import Entrada from "./Entrada";

export default function Formulario(props: FormularioProps) {
  const id = props.cliente?.getId;
  const [nome, setNome] = useState(props.cliente?.getNome ?? "");
  const [idade, setIdade] = useState(props.cliente?.getIdade ?? 0);

  return (
    <div>
      {id ? (
        <Entrada 
        somenteLeitura 
        texto="Código" 
        valor={id} 
        className="mb-5" />
      ) : (
        false
      )}
      <Entrada
        texto="Nome"
        valor={nome}
        valorMudou={setNome}
        className="mb-5"/>
      <Entrada
        texto="Idade"
        tipo="number"
        valor={idade}
        valorMudou={setIdade}/>
      <div className="flex justify-end mt-7">
        <Botao
          cor="blue"
          className="mr-2"
          onClick={() => 
            props.clienteMudou?.(new Cliente(nome, +idade, id))}>
          {id ? "Alterar" : "Salvar"}
        </Botao>

        <Botao onClick={props.cancelado}>Cancelar</Botao>
      </div>
    </div>
  );
}
