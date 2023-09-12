from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime

app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:''localhost/flaskreact"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
ma= Marshmallow(app)


class User(db.Model):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
    date=db.Column(db.Datetime,default=datetime.datetime.now)
    projetos = db.relationship('Projeto', backref='usuario', lazy=True)
    
    def __init__(self, name, email):
        self.name=name
        self.email=email
    

class Tarefa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    valor = db.Column(db.String(255), nullable=False)
    dados = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    dataInicio = db.Column(db.Date, nullable=False)
    dataPrevista = db.Column(db.Date, nullable=False)
    dataTermino = db.Column(db.Date, nullable=False)


class Projeto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    tarefas = db.relationship('Tarefa', backref='projeto', lazy=True)


class TarefaSchema(ma.Schema):
    class Meta:
        fields = ('id', 'valor', 'dados', 'status', 'dataInicio', 'dataPrevista', 'dataTermino')

tarefa_schema = TarefaSchema()
tarefas_schema = TarefaSchema(many=True)


@app.route('/tarefas', methods=['POST'])
def adicionar_tarefa():
    valor = request.json['valor']
    dados = request.json['dados']
    status = request.json['status']
    dataInicio = request.json['dataInicio']
    dataPrevista = request.json['dataPrevista']
    dataTermino = request.json['dataTermino']

    nova_tarefa = Tarefa(valor=valor, dados=dados, status=status, dataInicio=dataInicio, dataPrevista=dataPrevista, dataTermino=dataTermino)

    db.session.add(nova_tarefa)
    db.session.commit()

    return tarefa_schema.jsonify(nova_tarefa)

@app.route('/projetos/<int:user_id>', methods=['GET'])
def listar_projetos(user_id):
    user = User.query.get(user_id)
    
    projetos = user.projetos 
    
    return render_template('listar_projetos.html', projetos=projetos)


@app.route('/projetos/<int:projeto_id>/tarefas', methods=['GET'])
def listar_tarefas_do_projeto(projeto_id):
    projeto = Projeto.query.get(projeto_id)

    tarefas = projeto.tarefas

    return render_template('listar_tarefas_projeto.html', projeto=projeto, tarefas=tarefas)


@app.route('/')
def hello_world():
    return '<p>Hello, World!</p>'

@app.route('/useradd', methods=['POST'])
def user_add():
    name = request.json['name']
    email = request.json['email']
    
    user = User(name, email)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"user_id": user.id, "message": "User added successfully"})

@app.route('/escolher_projeto/<int:user_id>', methods=['GET'])
def escolher_projeto(user_id):

    user = User.query.get(user_id)
    tarefas = Tarefa.query.all()
    
    return tarefas_schema.jsonify(tarefas)


if __name__ == '__main__':
    app.run(debug=True)
