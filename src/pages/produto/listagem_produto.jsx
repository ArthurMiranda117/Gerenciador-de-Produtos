import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalAviso from "../../assets/js/ModalAviso";
import ModalConfirmacao from "../../assets/js/ModalConfirmacao";

export default function Produtos() {
    const [listaProdutos, setListaProdutos] = useState([]);
    const navigate = useNavigate();
    const fetchData = async () => {
        const resposta = await fetch("/api/listaProduto");
        const dados = await resposta.json();
        setListaProdutos(dados);
    };

    useEffect(() => {
      fetchData();
    },[]);

    const[modalAviso, setModalAviso] = useState(false);
    const[mensagemApi, setMensagemApi] = useState("");
    const[modalConfirmacao, setModalConfirmacao] = useState(false);
    const[idDeletar,setIdDeletar] = useState(null);

    const abriConfirmacao = (id) => {
        setIdDeletar(id);
        setModalConfirmacao(true);
    };

    const confirmaExclusao = async () => {
        try {
          const resposta = await fetch("/api/excluiProduto/"+ idDeletar,{
            method: "DELETE",
          });
          const data = await resposta.json();

          if (resposta.ok) {
            setListaProdutos(
                listaProdutos.filter((item) => item.ID_produto !== idDeletar),
            );
            setMensagemApi(data.message || "Ação concluída!");
            setModalAviso(true);
          } else {
            setMensagemApi(data.message || "Ação não realizada.");
            setModalAviso(true);
          }
        }   catch (error) {
            console.error("Erro: ", error);
            setMensagemApi("Erro ao conectar com o servidor.");
            setModalAviso(true);
        }   finally {
            setModalConfirmacao(false);
            setIdDeletar(null);
        }
    };
    return (
    <>
        <section id="head">
            <title>Produtos</title>
        </section>
        <section id="body">
            <div className="tabela">
                <h1>Lista de Produtos</h1>
                <button onClick={() => navigate("/CadastroProduto")}>
                    {" "}
                    + Novo Cadastro{" "}
                </button>
                <table>
                    <thead>
                        <tr>
                            <th rowspan="2">Tipo</th>
                            <th rowspan="2">Marca</th>
                            <th rowspan="2">Modelo</th>
                            <th rowspan="2">Quantidade</th>
                            <th rowspan="2">Cor</th>
                            <th rowspan="2">Data</th>
                            <th rowspan="1" colspan="2">
                                Ações
                            </th>
                        </tr>
                        <tr>
                            <th rowspan="1">Editar</th>
                            <th rowspan="1">Excluir</th>
                        </tr>
                    </thead>
            <tbody>
              {
                listaProdutos.length > 0 ? (
                    listaProdutos.map((res) =>(
                    <tr key={res.ID_produto}>
                            <td>{res.tipo_produto}</td>
                            <td>{res.marca_produto}</td>
                            <td>{res.modelo_produto}</td>
                            <td>{res.qnt_produto}</td>
                            <td>{res.cor_produto}</td>
                            <td>{res.data_produto}</td>
                        <td>
                            <button
                                onClick={() =>
                                    navigate("/EditarProduto/"+ res.ID_produto)}
                            >
                                ✏️
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={() => abriConfirmacao(res.ID_produto)}
                            >
                                🗑️
                            </button>
                        </td>
                    </tr>
                    ))
                    ) : (
                        <tr>
                            <td colspan="9">Nenhum produto encontrado.</td>
                        </tr>
                    )
                }
                </tbody>
                </table>
                </div>
                </section>
                
                <section id="code">
                    <ModalAviso
                    isOpen={modalAviso}
                    onClose={() => setModalAviso(false)}
                    message={mensagemApi}
                    />
                    <ModalConfirmacao
                    isOpen={modalConfirmacao}
                    onClose={() => setModalConfirmacao(false)}
                    onConfirm={confirmaExclusao}
                    />
                </section>
            </>
    );
}