<<<<<<< HEAD
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from flask_bcrypt import Bcrypt
# Flask SQLAlchemy와 SocketIO 객체 생성
db = SQLAlchemy()
socketio = SocketIO()
bcrypt = Bcrypt()


class AutoBill(db.Model):
    __tablename__ = 'capstone_database'
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    name = db.Column(db.String(255))
    image = db.Column(db.String(255))
    num = db.Column(db.Integer)

    def __init__(self, price, name, image, num):
        self.price = price
        self.name = name
        self.image = image
        self.num = num
        

class Admin(db.Model):
    __tablename__ = 'administers'

    id = db.Column(db.String(64), primary_key=True)
    password = db.Column(db.String(128))

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
=======
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from flask_bcrypt import Bcrypt
# Flask SQLAlchemy와 SocketIO 객체 생성
db = SQLAlchemy()
socketio = SocketIO()
bcrypt = Bcrypt()


class AutoBill(db.Model):
    __tablename__ = 'capstone_database'
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    name = db.Column(db.String(255))
    image = db.Column(db.String(255))
    num = db.Column(db.Integer)

    def __init__(self, price, name, image, num):
        self.price = price
        self.name = name
        self.image = image
        self.num = num
        

class Admin(db.Model):
    __tablename__ = 'administers'

    id = db.Column(db.String(64), primary_key=True)
    password = db.Column(db.String(128))

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
>>>>>>> origin/master
        return bcrypt.check_password_hash(self.password, password)