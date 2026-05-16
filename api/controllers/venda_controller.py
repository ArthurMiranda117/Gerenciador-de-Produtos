from flask import Blueprint, jsonify, request
from models.venda import Venda

venda_bp = Blueprint('venda', __name__)

@venda_bp.route('/api/listaVenda', methods=['GET'])
def Listar_Venda():

    listarVenda = Venda.Listar_Venda()
    return jsonify(listarVenda)

@venda_bp.route('/api/cadastroVenda', methods=['POST'])
def Cadastrar_Venda():
    data = request.get_json()

    produto_ID = data.get('produto_ID')
    quantidade = data.get('quantidade')
    data_venda = data.get('data_venda')
    cliente_nome = data.get('cliente_nome')
    valor_total = data.get('valor_total')

    id = Venda.Cadastrar_Venda(produto_ID, quantidade, data_venda, cliente_nome, valor_total)

    if id == 1:
        return jsonify({"message": "Venda cadastrada com sucesso!"}), 201
    elif id == 2:
        return jsonify({"message": "Venda atualizada com sucesso!"}), 201
    else:
        return jsonify({"message": "Falhou em salvar os dados."}), 500

    
@venda_bp.route('/api/excluiVenda/<int:id>', methods=['DELETE'])
def Remover_Venda(id):
    venda = Venda.Remover_Venda(id)

    if venda is None:
        return jsonify({"message": "Não foi possível remover o registro."}), 500

    return jsonify({"message": "Venda removida com sucesso!"}), 200



@venda_bp.route('/api/editarVenda/<int:id>', methods=['GET'])
def Editar_Venda(id):

    dados = Venda.Editar_Venda(id)
    return jsonify(dados)

@venda_bp.route('/api/atualizarVenda/<int:id>', methods=['PUT'])
def Atualizar_Venda(id):
    data = request.get_json(force=True)

    produto_ID = data.get('produto_ID')
    quantidade = data.get('quantidade')
    data_venda = data.get('data_venda')
    cliente_nome = data.get('cliente_nome')
    valor_total = data.get('valor_total')

    venda = Venda.Atualizar_Venda(id, produto_ID, quantidade, data_venda, cliente_nome, valor_total)

    if venda == 0:
        return jsonify({"message": "Não foi possível alterar o registro."}), 500
    else:
        return jsonify({"message": "Venda alterada com sucesso!"}), 200