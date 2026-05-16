from models.db_connect import MySQLConnector
from mysql.connector import Error

class Venda:
    def __init__(self, title, content):
        self.title = title
        self.content = content
   
    @staticmethod
    def Cadastrar_Venda(produto_id, qnt, data, cliente, valor):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            script = "INSERT INTO tb_vendas (produto_ID, quantidade, data_venda, cliente_nome, valor_total) VALUES (%s,%s,%s,%s,%s)"
            cursor.execute(script, (produto_id, qnt, data, cliente, valor))
            conn.commit()
            return 1

        except Error as e:
            print(f"Erro: {e}")
            return 0
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()
    
    @staticmethod
    def Listar_Venda():
        db = MySQLConnector()
        conn = None
        resultado = []

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)
            sql ="""SELECT 
                    tb_vendas.ID_venda,
                    tb_vendas.quantidade,
                    tb_vendas.data_venda,
                    tb_vendas.cliente_nome,
                    tb_vendas.valor_total,
                    tb_produtos.marca_produto,
                    tb_produtos.modelo_produto
                FROM tb_vendas
                INNER JOIN tb_produtos ON tb_vendas.produto_ID = tb_produtos.ID_produto"""
            cursor.execute(sql)
            resultado = cursor.fetchall()

        except Error as e:
            print(f"Erro: {e}")
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()

        return resultado
    
    @staticmethod
    def Remover_Venda(id):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            query = "SELECT produto_ID, quantidade, data_venda, cliente_nome, valor_total FROM tb_vendas WHERE ID_venda = %s"
            cursor.execute(query, (id,))
            resultado = cursor.fetchone()

            sql = "DELETE FROM tb_vendas WHERE ID_venda = %s"
            cursor.execute(sql, (id,))
            conn.commit()

            return resultado
        
        except Error as e:
            if conn:
                conn.rollback()
            print(f"Erro: {e}")
        finally:
            if conn and conn.is_connected():
                cursor.close()
                db.close()

    @staticmethod
    def Editar_Venda(id):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            query = "SELECT * FROM tb_vendas WHERE ID_venda = %s"
            cursor.execute(query, (id,))
            resultado = cursor.fetchone()
            return resultado

        except Error as e:
            print(f"Erro: {e}")
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()

    @staticmethod
    def Atualizar_Venda(id,produto, qnt, data, cliente, valor):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            query = "UPDATE tb_vendas SET produto_ID = %s, quantidade = %s, data_venda = %s, cliente_nome = %s, valor_total = %s WHERE ID_venda = %s;"
            cursor.execute(query, (produto, qnt, data, cliente, valor, id))
            conn.commit()
            return 1 #"Venda cadastrada com sucesso!"
        
        except Error as e:
            if conn:
                conn.rollback()
            print(f"Erro: {e}")
            return 0
        finally:
            if conn and conn.is_connected():
                cursor.close()
                db.close()