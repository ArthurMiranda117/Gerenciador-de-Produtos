from models.db_connect import MySQLConnector
from mysql.connector import Error

class Fornecedor:
    def __init__(self, title, content):
        self.title = title
        self.content = content

    @staticmethod
    def Cadastrar_Fornecedor(nome, telefone, cnpj, qnt):
        db = MySQLConnector()
        conn = None
        id = None
        obj = Fornecedor

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            if id is None:
                script = "INSERT INTO tb_fornecedor (nome_empresa, telefone, cnpj, qnt_material) VALUES (%s,%s,%s,%s)"
                cursor.execute(script,(nome, telefone, cnpj, qnt))
                conn.commit()
                return 1 #"Produto cadastrado com sucesso!"
            
            else:
                script = "UPDATE tb_fornecedor SET qnt_material = qnt_material + %s WHERE ID_fornecedor = %s;"
                cursor.execute(script, (qnt, id))
                conn.commit()
            return 2 #"Quantidade de produto atualizada com sucesso!"
        except Error as e:
            print(f"Erro: {e}")

            return 0
        finally:
            if conn and conn.is_connected():
                cursor.close()
                db.close()
    
    @staticmethod
    def Listar_Fornecedor():
        db = MySQLConnector()
        conn = None
        resultado = []

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)
            sql = "SELECT * FROM tb_fornecedor"
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
    def Remover_Fornecedor(id):
        db = MySQLConnector()
        conn = None
        resultado = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            query = "SELECT nome_empresa, telefone FROM tb_fornecedor WHERE ID_fornecedor = %s"
            cursor.execute(query, (id,))
            resultado = cursor.fetchone()

            sql = "DELETE FROM tb_fornecedor WHERE ID_fornecedor = %s"
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
    def Editar_Fornecedor(id):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            sql = "SELECT * FROM tb_fornecedor WHERE ID_fornecedor = %s"
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
    def Atualizar_Fornecedor(id, nome, telefone, cnpj, qnt):
        db = MySQLConnector()
        conn = None

        try:
            conn = db.connect()
            cursor = conn.cursor(dictionary=True)

            sql = """UPDATE tb_fornecedor SET nome_empresa = %s, telefone = %s, cnpj = %s, qnt_material = %s WHERE ID_fornecedor = %s"""
            cursor.execute(sql, (nome, telefone, cnpj, qnt, id))
            conn.commit()
            return True

        except Error as e:
            print(f"Erro: {e}")
            return False
        finally:
            if conn and conn.is_connected():
                cursor.close()
                conn.close()