import React, { useState, useEffect } from "react";
import ModalAviso from "../../assets/js/ModalAviso";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarVenda() {
    const { id } = useParams();
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

    useEffect(() => {
        fetch("/api/editarVenda/" + id)
            .then((res) => res.json())
            .then((data) => setInputs(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/atualizarVenda/" + id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs),
            });
            const data = await response.json();

            if (response.ok) {
                setMensagemApi(data.message || "Ação concluída!");
                setModalAviso(true);
            } else {
                setMensagemApi(data.message || "Erro ao atualizar.");
                setModalAviso(true);
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
                <h1>Editar Venda</h1>
                <form onSubmit={handleSubmit}>
                    <label>ID Produto: </label>
                    <input type="number" name="produto_ID" value={inputs.produto_ID}
                        onChange={handleChange} placeholder="Digite o ID do produto" required />
                    <br /><br />
                    <label>Quantidade: </label>
                    <input type="number" name="quantidade" value={inputs.quantidade}
                        onChange={handleChange} placeholder="Digite a quantidade" required />
                    <br /><br />
                    <label>Data: </label>
                    <input type="date" name="data_venda" value={inputs.data_venda}
                        onChange={handleChange} required />
                    <br /><br />
                    <label>Cliente: </label>
                    <input type="text" name="cliente_nome" value={inputs.cliente_nome}
                        onChange={handleChange} placeholder="Digite o nome do cliente" required />
                    <br /><br />
                    <label>Valor Total: </label>
                    <input type="number" name="valor_total" value={inputs.valor_total}
                        onChange={handleChange} placeholder="Digite o valor total" required />
                    <br /><br />
                    <button type="submit">Alterar</button>
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