import React, { useState, useEffect } from "react";
import ModalAviso from "../../assets/js/ModalAviso";
import { useParams, useNavigate } from "react-router-dom";

export default function EditaProdutos() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [inputs, setInputs] = useState({
        tipo_produto: "",
        marca_produto: "",
        modelo_produto: "",
        qnt_produto: "",
        cor_produto: "",
        data_produto: "",
    });
    const [modalAviso, setModalAviso] = useState(false);
    const [mensagemApi, setMensagemApi] = useState("");

    useEffect(() => {
        fetch("/api/editarProduto/" + id)
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
            const response = await fetch("/api/atualizarProduto/" + id, {
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
                <h1>Editar Produto</h1>
                <form onSubmit={handleSubmit}>
                    <label>Tipo: </label>
                    <input type="text" name="tipo_produto" value={inputs.tipo_produto}
                        onChange={handleChange} placeholder="Digite o tipo" required />
                    <br /><br />
                    <label>Marca: </label>
                    <input type="text" name="marca_produto" value={inputs.marca_produto}
                        onChange={handleChange} placeholder="Digite a marca" required />
                    <br /><br />
                    <label>Modelo: </label>
                    <input type="text" name="modelo_produto" value={inputs.modelo_produto}
                        onChange={handleChange} placeholder="Digite o modelo" required />
                    <br /><br />
                    <label>Quantidade: </label>
                    <input type="number" name="qnt_produto" value={inputs.qnt_produto}
                        onChange={handleChange} placeholder="Digite a quantidade" required />
                    <br /><br />
                    <label>Cor: </label>
                    <input type="text" name="cor_produto" value={inputs.cor_produto}
                        onChange={handleChange} placeholder="Digite a cor" required />
                    <br /><br />
                    <label>Data: </label>
                    <input type="date" name="data_produto" value={inputs.data_produto}
                        onChange={handleChange} required />
                    <br /><br />
                    <button type="submit">Alterar</button>
                    <button type="button" onClick={() => navigate("/Produtos")}>Cancelar</button>
                </form>
            </section>

            <ModalAviso
                isOpen={modalAviso}
                onClose={() => {
                    setModalAviso(false);
                    navigate("/Produtos");
                }}
                message={mensagemApi}
            />
        </>
    );
}