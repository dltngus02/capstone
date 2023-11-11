from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO


# Flask SQLAlchemy와 SocketIO 객체 생성
db = SQLAlchemy()
socketio = SocketIO()

class AutoBill(db.Model):
    __tablename__ = '물건22'
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