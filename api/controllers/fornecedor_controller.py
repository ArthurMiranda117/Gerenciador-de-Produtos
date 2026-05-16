from flask import Blueprint, jsonify, request
from models.fornecedor import Fornecedor

fornecedor_bp = Blueprint('fornecedor', __name__)

@fornecedor_bp.route('/api/listaFornecedor', methods=['GET'])
def Listar_Fornecedor():
    listarFornecedor = Fornecedor.Listar_Fornecedor()
    return jsonify(listarFornecedor)

@fornecedor_bp.route('/api/cadastroFornecedor', methods=['POST'])
def Cadastrar_Fornecedor():
    id = 0
    data = request.get_json()

    nome_empresa = data.get('nome_empresa')
    telefone = data.get('telefone')
    cnpj = data.get('cnpj')
    qnt_material = data.get('qnt_material')

    id = Fornecedor.Cadastrar_Fornecedor(nome_empresa, telefone, cnpj, qnt_material)

    if id == 1:
        return jsonify({"message": "Produto: " + nome_empresa + " - " + cnpj + " cadastrado com sucesso!"}), 201
    elif id == 2:
        return jsonify({"message": "Produto " + nome_empresa + " - " + cnpj + " teve o estoque atualizado!"}), 201
    else:
        return jsonify({"message": "Falhou em salvar os dados."}), 500
    
@fornecedor_bp.route('/api/excluiFornecedor/<int:id>', methods=['DELETE'])
def Remover_Fornecedor(id):
    fornecedor = Fornecedor.Remover_Fornecedor(id)

    if fornecedor is None:
        return jsonify({"message": "Não foi possível remover o registro."}), 500
    
    nome = str(fornecedor['nome_empresa'])
    return jsonify({"message": "Fornecedor " + nome + " removido com sucesso!"}), 200

@fornecedor_bp.route('/api/editarFornecedor/<int:id>', methods=['GET'])
def Editar_Fornecedor(id):

    dados = Fornecedor.Editar_Fornecedor(id)
    return jsonify(dados)
    
@fornecedor_bp.route('/api/atualizarFornecedor/<int:id>', methods=['PUT'])
def Atualizar_Fornecedor(id):
    data = request.get_json()

    nome_empresa = data.get('nome_empresa')
    telefone = data.get('telefone')
    cnpj = data.get('cnpj')
    qnt_material = data.get('qnt_material')

    resultado = Fornecedor.Atualizar_Fornecedor(id, nome_empresa, telefone, cnpj, qnt_material)

    if resultado:
        return jsonify({"message": "Fornecedor atualizado com sucesso!"}), 200
    else:
        return jsonify({"message": "Erro ao atualizar fornecedor."}), 500