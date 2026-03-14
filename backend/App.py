import mariadb
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuración de conexión a MariaDB
config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'tu_password',
    'database': 'veterinaria_db'
}
import mariadb
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuración de conexión a MariaDB
config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'tu_password',
    'database': 'veterinaria_db'
}

def get_db_connection():
    return mariadb.connect(**config)

@app.route('/api/login', methods=['POST'])
def login():
    datos = request.json
    email = datos.get('email')
    password = datos.get('contraseña')

    try:
        conn = get_db_connection()
        cur = conn.cursor(dictionary=True) # dictionary=True para que devuelva clave:valor

        # Consulta SQL directa
        query = "SELECT id, nombre_usuario, email, role_id FROM Usuario WHERE email = ? AND contraseña = ?"
        cur.execute(query, (email, password))
        
        user = cur.fetchone()
        conn.close()

        if user:
            return jsonify({
                "status": "success",
                "user": user  # Enviamos el id, nombre, email y rol a React
            }), 200
        else:
            return jsonify({"status": "error", "message": "Usuario no encontrado"}), 401

    except mariadb.Error as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
def get_db_connection():
    return mariadb.connect(**config)

@app.route('/api/login', methods=['POST'])
def login():
    datos = request.json
    email = datos.get('email')
    password = datos.get('contraseña')

    try:
        conn = get_db_connection()
        cur = conn.cursor(dictionary=True) # dictionary=True para que devuelva clave:valor

        # Consulta SQL directa
        query = "SELECT id, nombre_usuario, email, role_id FROM Usuario WHERE email = ? AND contraseña = ?"
        cur.execute(query, (email, password))
        
        user = cur.fetchone()
        conn.close()

        if user:
            return jsonify({
                "status": "success",
                "user": user  # Enviamos el id, nombre, email y rol a React
            }), 200
        else:
            return jsonify({"status": "error", "message": "Usuario no encontrado"}), 401

    except mariadb.Error as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)