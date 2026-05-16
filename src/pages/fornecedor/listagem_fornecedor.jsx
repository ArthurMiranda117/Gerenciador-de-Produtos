import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModalAviso from "../../assets/js/ModalAviso";
import ModalConfirmacao from "../../assets/js/ModalConfirmacao";

export default function Fornecedor() {
    const [listaFornecedor, setListaFornecedor] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async () => {
        try {
            const resposta = await fetch("/api/listaFornecedor");
            const texto = await resposta.text();
            const dados = JSON.parse(texto);

            if (Array.isArray(dados)) {
                setListaFornecedor(dados);
            } else if (dados && Array.isArray(dados.fornecedores)) {
                setListaFornecedor(dados.fornecedores);
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
            const resposta = await fetch("/api/excluiFornecedor/" + idDeletar, {
                method: "DELETE",
            });
            const data = await resposta.json();

            if (resposta.ok) {
                setListaFornecedor(
                    listaFornecedor.filter((item) => item.ID_fornecedor !== idDeletar)
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
                    <h1>Lista de Fornecedores</h1>
                    <button onClick={() => navigate("/CadastroFornecedor")}>
                        + Novo Cadastro
                    </button>
                    <table>
                        <thead>
                            <tr>
                                <th rowSpan="2">Empresa</th>
                                <th rowSpan="2">Telefone</th>
                                <th rowSpan="2">CNPJ</th>
                                <th rowSpan="2">Quantidade Material</th>
                                <th colSpan="2">Ações</th>
                            </tr>
                            <tr>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaFornecedor.length > 0 ? (
                                listaFornecedor.map((res) => (
                                    <tr key={res.ID_fornecedor}>
                                        <td>{res.nome_empresa}</td>
                                        <td>{res.telefone}</td>
                                        <td>{res.cnpj}</td>
                                        <td>{res.qnt_material}</td>
                                        <td>
                                            <button onClick={() => navigate("/EditarFornecedor/" + res.ID_fornecedor)}>
                                                ✏️
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => abriConfirmacao(res.ID_fornecedor)}>
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Nenhum fornecedor encontrado.</td>
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