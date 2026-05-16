from flask import Blueprint, jsonify, request
from models.produto import Produto

produto_bp = Blueprint('produto', __name__)

@produto_bp.route('/api/listaProduto', methods=['GET'])
def Listar_Produtos():

    listarProdutos = Produto.Listar_Produtos()
    return jsonify(listarProdutos)

@produto_bp.route('/api/cadastroProduto', methods=['POST'])
def Cadastrar_Produto():
    id = 0
    data = request.get_json()

    tipo_produto = data.get('tipo_produto')
    marca_produto = data.get('marca_produto')
    modelo_produto = data.get('modelo_produto')
    qnt_produto = data.get('qnt_produto')
    cor_produto = data.get('cor_produto')
    data_produto = data.get('data_produto')

    id = Produto.Cadastrar_Produto(tipo_produto, marca_produto, modelo_produto, qnt_produto, cor_produto, data_produto)

    if id == 1:
        return jsonify({"message": "Produto: " + tipo_produto + " - " + modelo_produto + " cadastrado com sucesso!"}), 201
    elif id == 2:
        return jsonify({"message": "Produto " + tipo_produto + " - " + modelo_produto + " teve o estoque atualizado!"}), 201
    else:
        return jsonify({"message": "Falhou em salvar os dados."}), 500
    
@produto_bp.route('/api/excluiProduto/<int:id>', methods=['DELETE'])
def Remover_Produto(id):
    produto = Produto.Remover_Produto(id)

    produto['modelo_produto'] = str(produto['modelo_produto'])
    modelo = produto['modelo_produto']

    produto['tipo_produto'] = str(produto['tipo_produto'])
    tipo = produto['tipo_produto']

    if produto is None:
        return jsonify({"message": "Não foi possível remover o registro."}), 500
    else:
        return jsonify({"message": "Produto " + modelo + " removido com Sucesso!"}), 201

@produto_bp.route('/api/editarProduto/<int:id>', methods=['GET'])
def Editar_Produto(id):

    dados = Produto.Editar_Produto(id)
    return jsonify(dados)

@produto_bp.route('/api/atualizarProduto/<int:id>', methods=['PUT'])
def Atualizar_Produto(id):
    data = request.get_json()

    tipo_produto = data.get('tipo_produto')
    marca_produto = data.get('marca_produto')
    modelo_produto = data.get('modelo_produto')
    qnt_produto = data.get('qnt_produto')
    cor_produto = data.get('cor_produto')
    data_produto = data.get('data_produto')

    resultado = Produto.Atualizar_Produto(id, tipo_produto, marca_produto, modelo_produto, qnt_produto, cor_produto, data_produto)

    if resultado:
        return jsonify({"message": "Fornecedor atualizado com sucesso!"}), 200
    else:
        return jsonify({"message": "Erro ao atualizar fornecedor."}), 500