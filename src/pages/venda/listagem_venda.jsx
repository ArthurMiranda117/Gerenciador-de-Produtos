import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModalAviso from "../../assets/js/ModalAviso";
import ModalConfirmacao from "../../assets/js/ModalConfirmacao";

export default function Vendas() {
    const [listaVenda, setListaVenda] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async () => {
        try {
            const resposta = await fetch("/api/listaVenda");
            const texto = await resposta.text();
            const dados = JSON.parse(texto);

            if (Array.isArray(dados)) {
                setListaVenda(dados);
            } else if (dados && Array.isArray(dados.vendas)) {
                setListaVenda(dados.vendas);
            } else {
                console.error("Formato inesperado:", dados);
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [location.key]);

    const [modalAviso, setModalAviso] = useState(false);
    const [mensagemApi, setMensagemApi] = useState("");
    const [modalConfirmacao, setModalConfirmacao] = useState(false);
    const [idDeletar, setIdDeletar] = useState(null);

    const abriConfirmacao = (id) => {
        setIdDeletar(id);
        setModalConfirmacao(true);
    };

    const confirmaExclusao = async () => {
        try {
            const resposta = await fetch("/api/excluiVenda/" + idDeletar, {
                method: "DELETE",
            });
            const data = await resposta.json();

            if (resposta.ok) {
                setListaVenda(
                    listaVenda.filter((item) => item.ID_venda !== idDeletar)
                );
                setMensagemApi(data.message || "Ação concluída!");
                setModalAviso(true);
            } else {
                setMensagemApi(data.message || "Ação não realizada.");
                setModalAviso(true);
            }
        } catch (error) {
            console.error("Erro: ", error);
            setMensagemApi("Erro ao conectar com o servidor.");
            setModalAviso(true);
        } finally {
            setModalConfirmacao(false);
            setIdDeletar(null);
        }
    };

    return (
        <>
            <section id="body">
                <div className="tabela">
                    <h1>Lista de Vendas</h1>
                    <button onClick={() => navigate("/CadastroVenda")}>
                        + Novo Cadastro
                    </button>
                    <table>
                        <thead>
    <tr>
        <th rowSpan="2">Marca</th> 
        <th rowSpan="2">Modelo</th>
        <th rowSpan="2">Quantidade</th>
        <th rowSpan="2">Data</th>
        <th rowSpan="2">Nome Cliente</th>
        <th rowSpan="2">Valor</th>
        <th colSpan="2">Ações</th>
    </tr>
    <tr>
        <th>Editar</th>
        <th>Excluir</th>
    </tr>
</thead>
<tbody>
    {listaVenda.length > 0 ? (
        listaVenda.map((res) => (
            <tr key={res.ID_venda}>
                <td>{res.marca_produto}</td>
                <td>{res.modelo_produto}</td>
                <td>{res.quantidade}</td>
                <td>{res.data_venda}</td>
                <td>{res.cliente_nome}</td>
                <td>{res.valor_total}</td>
                <td>
                    <button onClick={() => navigate("/EditarVenda/" + res.ID_venda)}>
                        ✏️
                    </button>
                </td>
                <td>
                    <button onClick={() => abriConfirmacao(res.ID_venda)}>
                        🗑️
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="8">Nenhuma venda encontrada.</td>
        </tr>
    )}
</tbody>
                    </table>
                </div>
            </section>

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
        </>
    );
}