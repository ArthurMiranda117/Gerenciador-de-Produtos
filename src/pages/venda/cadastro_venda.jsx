import React, { useState } from "react";
import ModalAviso from "../../assets/js/ModalAviso";
import { useNavigate } from "react-router-dom";

export default function CadastroVenda() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        produto_ID: "",
        quantidade: "",
        data_venda: "",
        cliente_nome: "",
        valor_total: "",
    });
    const [modalAviso, setModalAviso] = useState(false);
    const [mensagemApi, setMensagemApi] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resposta = await fetch("/api/cadastroVenda", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs),
            });
            const data = await resposta.json();

            if (resposta.ok) {
                setMensagemApi(data.message || "Ação concluída!");
                setModalAviso(true);
                setInputs({produto_ID: "", quantidade: "", data_venda: "", cliente_nome: "", valor_total: "",});
            }
        } catch (error) {
            console.error("Erro:", error);
            setMensagemApi("Erro ao conectar com o servidor.");
            setModalAviso(true);
        }
    };

    return (
        <>
            <section id="body">
                <h1>Cadastro de Vendas</h1>
                <br /><br />
                <form onSubmit={handleSubmit}>
                    <label>ID Produto: </label>
                    <input 
                    type="number"
                    name="produto_ID" 
                    value={inputs.produto_ID}
                    onChange={handleChange} 
                    placeholder="Digite o ID do produto" 
                    required />
                    <br /><br />
                    <label>Quantidade: </label>
                    <input 
                    type="number" 
                    name="quantidade" 
                    value={inputs.quantidade}
                    onChange={handleChange} 
                    placeholder="Digite a quantidade de venda" 
                    required />
                    <br /><br />
                    <label>Data: </label>
                    <input 
                    type="date" 
                    name="data_venda" 
                    value={inputs.data_venda}
                    onChange={handleChange} 
                    placeholder="Digite a data da venda" 
                    required />
                    <br /><br />
                    <label>Cliente: </label>
                    <input 
                    type="text" 
                    name="cliente_nome" 
                    value={inputs.cliente_nome}
                    onChange={handleChange} 
                    placeholder="Digite o nome do cliente" 
                    required />
                    <br /><br />
                    <label>Valor: </label>
                    <input 
                    type="number" 
                    name="valor_total" 
                    value={inputs.valor_total}
                    onChange={handleChange} 
                    placeholder="Digite o valor da venda" 
                    required />
                    <br /><br />
                    <button type="submit">Enviar</button>
                    <button type="button" onClick={() => navigate("/Vendas")}>
                        Cancelar
                    </button>
                </form>
            </section>

            <ModalAviso
                isOpen={modalAviso}
                onClose={() => {
                    setModalAviso(false);
                    navigate("/Vendas");
                }}
                message={mensagemApi}
            />
        </>
    );
}