import React, { useState } from "react";
import ModalAviso from "../../assets/js/ModalAviso";
import { useNavigate } from "react-router-dom";

export default function cadastroProduto() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resposta = await fetch("/api/cadastroProduto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs),
            });
            const data = await resposta.json();

            if (resposta.ok) {
                setMensagemApi(data.message || "Ação concluída!");
                setModalAviso(true);
                setInputs({ tipo_produto: "", marca_produto: "", modelo_produto: "", qnt_produto: "", cor_produto: "", data_produto: "" });
            } else {
                setMensagemApi(data.message || "Erro ao cadastrar.");
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
                <h1>Cadastro de Produto</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <label>Tipo: </label>
                    <input type="text" name="tipo_produto" value={inputs.tipo_produto}
                        onChange={handleChange} placeholder="Digite o tipo do produto" required />
                    <br /><br />
                    <label>Marca: </label>
                    <input type="text" name="marca_produto" value={inputs.marca_produto}
                        onChange={handleChange} placeholder="Digite a marca do produto" required />
                    <br /><br />
                    <label>Modelo: </label>
                    <input type="text" name="modelo_produto" value={inputs.modelo_produto}
                        onChange={handleChange} placeholder="Digite o modelo do produto" required />
                    <br /><br />
                    <label>Quantidade: </label>
                    <input type="number" name="qnt_produto" value={inputs.qnt_produto}
                        onChange={handleChange} placeholder="Digite a quantidade do produto" required />
                    <br /><br />
                    <label>Cor: </label>
                    <input type="text" name="cor_produto" value={inputs.cor_produto}
                        onChange={handleChange} placeholder="Digite a cor do produto" required />
                    <br /><br />
                    <label>Data: </label>
                    <input type="date" name="data_produto" value={inputs.data_produto}
                        onChange={handleChange} required />
                    <br /><br />
                    <button type="submit">Enviar</button>
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