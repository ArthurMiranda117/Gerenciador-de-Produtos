import React, { useState, useEffect } from "react";
import ModalAviso from "../../assets/js/ModalAviso";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarFornecedor() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [inputs, setInputs] = useState({
        nome_empresa: "",
        telefone: "",
        cnpj: "",
        qnt_material: "",
    });
    const [modalAviso, setModalAviso] = useState(false);
    const [mensagemApi, setMensagemApi] = useState("");

    useEffect(() => {
        fetch("/api/editarFornecedor/" + id)
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
            const response = await fetch("/api/atualizarFornecedor/" + id, {
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
                <h1>Editar Fornecedor</h1>
                <form onSubmit={handleSubmit}>
                    <label>Nome: </label>
                    <input type="text" name="nome_empresa" value={inputs.nome_empresa}
                        onChange={handleChange} placeholder="Digite o nome" required />
                    <br /><br />
                    <label>Telefone: </label>
                    <input type="number" name="telefone" value={inputs.telefone}
                        onChange={handleChange} placeholder="Digite o telefone" required />
                    <br /><br />
                    <label>CNPJ: </label>
                    <input type="number" name="cnpj" value={inputs.cnpj}
                        onChange={handleChange} placeholder="Digite o CNPJ" required />
                    <br /><br />
                    <label>Quantidade: </label>
                    <input type="number" name="qnt_material" value={inputs.qnt_material}
                        onChange={handleChange} placeholder="Digite a quantidade" required />
                    <br /><br />
                    <button type="submit">Alterar</button>
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