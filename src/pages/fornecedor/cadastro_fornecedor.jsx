import React, { useState } from "react";
import ModalAviso from "../../assets/js/ModalAviso";
import { useNavigate } from "react-router-dom";

export default function CadastroFornecedor() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        nome_empresa: "",
        telefone: "",
        cnpj: "",
        qnt_material: "",
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
            const resposta = await fetch("/api/cadastroFornecedor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs),
            });
            const data = await resposta.json();

            if (resposta.ok) {
                setMensagemApi(data.message || "Ação concluída!");
                setModalAviso(true);
                setInputs({ nome_empresa: "", telefone: "", cnpj: "", qnt_material: "" });
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
                <h1>Cadastro da empresa</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <label>Nome: </label>
                    <input type="text" name="nome_empresa" value={inputs.nome_empresa}
                        onChange={handleChange} placeholder="Digite o nome da empresa" required />
                    <br /><br />
                    <label>Telefone: </label>
                    <input type="number" name="telefone" value={inputs.telefone}
                        onChange={handleChange} placeholder="Digite o telefone da empresa" required />
                    <br /><br />
                    <label>CNPJ: </label>
                    <input type="number" name="cnpj" value={inputs.cnpj}
                        onChange={handleChange} placeholder="Digite o CNPJ da empresa" required />
                    <br /><br />
                    <label>Qnt/Material: </label>
                    <input type="number" name="qnt_material" value={inputs.qnt_material}
                        onChange={handleChange} placeholder="Digite a quantidade de material" required />
                    <br /><br />
                    <button type="submit">Enviar</button>
                    <button type="button" onClick={() => navigate("/Fornecedor")}>
                        Cancelar
                    </button>
                </form>
            </section>

            <ModalAviso
                isOpen={modalAviso}
                onClose={() => {
                    setModalAviso(false);
                    navigate("/Fornecedor");
                }}
                message={mensagemApi}
            />
        </>
    );
}