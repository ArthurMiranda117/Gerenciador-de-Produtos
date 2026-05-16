from models.db_connect import MySQLConnector
from mysql.connector import Error

class Produto:
    def __init__(self, title, content):
        self.title = title
        self.content = content

    @staticmethod
    def Cadastrar_Produto(tipo, marca, modelo, qnt, cor, data):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            script = "INSERT INTO tb_produtos (tipo_produto, marca_produto, modelo_produto, qnt_produto, cor_produto, data_produto) VALUES (%s,%s,%s,%s,%s,%s)"
            cursor.execute(script, (tipo, marca, modelo, qnt, cor, data))
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
    def Listar_Produtos():
        db = MySQLConnector()
        conn = None
        resultado = []

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)
            sql = "SELECT * FROM tb_produtos"
            cursor.execute(sql)
            resultado = cursor.fetchall()

        except Error as e:
            print(f"Erro: {e}")
        finally:
            if conn and conn.is_connected():
                cursor.close()
                db.close()

        return resultado

    @staticmethod
    def Remover_Produto(id):
        db = MySQLConnector()
        conn = None
        resultado = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            query = "SELECT modelo_produto, tipo_produto FROM tb_produtos WHERE ID_produto = %s"
            cursor.execute(query, (id,))
            resultado = cursor.fetchone()

            sql = "DELETE FROM tb_produtos WHERE ID_produto = %s"
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
    def Editar_Produto(id):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            sql = "SELECT * FROM tb_produtos WHERE ID_produto = %s"
            cursor.execute(sql,(id,))
            resultado = cursor.fetchone()

        except Error as e:
            print(f"Erro: {e}")
        finally:
            if conn and conn.is_connected():
                cursor.close()
                db.close()
        
        return resultado
    
    @staticmethod
    def Atualizar_Produto(id, tipo, marca, modelo, qnt, cor, data):   
        db = MySQLConnector()
        conn = None
        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            sql = "UPDATE tb_produtos SET tipo_produto = %s, marca_produto = %s, modelo_produto = %s, qnt_produto = %s, cor_produto = %s, data_produto = %s WHERE ID_produto = %s"
            cursor.execute(sql, (tipo, marca, modelo, qnt, cor, data, id))
            conn.commit()
            return True

        except Error as e:
            print(f"Erro: {e}")
            return False
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()