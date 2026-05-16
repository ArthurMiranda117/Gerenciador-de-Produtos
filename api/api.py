from flask import Flask
from controllers.produto_controller import produto_bp
from controllers.fornecedor_controller import fornecedor_bp
from controllers.venda_controller import venda_bp

app = Flask(__name__)
app.register_blueprint(produto_bp)
app.register_blueprint(fornecedor_bp)
app.register_blueprint(venda_bp)