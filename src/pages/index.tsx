import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import useClientes from "../hooks/useClientes";

export default function Home() {
  const { 
    cliente, 
    clientes, 
    selecionarCliente, 
    excluirCliente,
    salvarCliente,
    tabelaVisivel,
    exibirTabela,
    novoCliente
  } = useClientes()
  
  return (
    <div
      className={`
    flex h-screen justify-center items-center
    bg-gradient-to-t from-blue-500 to-purple-500
    text-white
   `}>
      <Layout titulo="Cadastro Simples">
        {tabelaVisivel ? (
          <>
            <div className="flex justify-end">
              <Botao
                cor="green"
                className="mb-4"
                onClick={novoCliente}>
                Novo Cliente
              </Botao>
            </div>
            <Tabela
              clientes={clientes}
              clienteSelecionado={selecionarCliente}
              clienteExcluido={excluirCliente}
            />
          </>
        ) : (
          <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => exibirTabela}
          />
        )}
      </Layout>
    </div>
  );
}
