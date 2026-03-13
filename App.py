from flask import Flask, render_template

def  conectar_db ():
    try:
        conn = mariadb.connect(
            user='admin',
            password='admin481',
            host='localhost',
            port=3066,
            database='Proyecto_Ganaderia2'
        )
    except mariadb.Error as e:
        print(f"Error al conectarse en la base de datos:{e}")
        return None
    return conn.cursor()
#Sección de ruta de la app principal de Veterinaria
app = Flask(__name__) 
@app.route("/")
def inicio():
    return render_template("index.html")

#Sección para acceder a la aplicación
@app.route("/login")
def login():
    return render_template("login.html")

#Seccón para crear 
@app.route("/new_user")
def new_user():
    return render_template("new_user.html")

@app.route("/register_vet")
def register_vet():
    return render_template("register_vet.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

if __name__ == "__main__":
    
    app.run(debug=True) 