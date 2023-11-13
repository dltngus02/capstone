from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from flask_login import UserMixin
from werkzeug.security import generate_password_hash,check_password_hash
from app import db, login_manager
import os
import hashlib
import binascii


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
        

# class Admin(db.Model):
#     __tablename__ = 'administers'

#     id = db.Column(db.String(64), primary_key=True)
#     password = db.Column(db.String(128))

#     def set_password(self, password):
#         self.password = bcrypt.generate_password_hash(password).decode('utf-8')

#     def check_password(self, password):
#         return bcrypt.check_password_hash(self.password, password)


class Quantity(db.Model):
    __tablename__ = '주문_물건'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    quantity = db.Column(db.Integer)
    order_day = db.Column(db.Integer)
    order_price = db.Column(db.Integer)
    
    def __init__(self, id, name, quantity, order_day, order_price):
        self.id = id
        self.name = name
        self.quantity = quantity
        self.order_day = order_day
        self.order_price = order_price

    
    
@login_manager.user_loader
def load_user(admin_id):
    return Admin.query.get(admin_id)




class Admin(db.Model, UserMixin):
    __tablename__ = 'administerss11'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(64), unique=True, index=True)
    password = db.Column(db.String(256))

    def __init__(self, id, email, password):
        self.id = id
        self.email = email
        self.password = self.generate_password_hash(password)

    def generate_password_hash(self, password, method='pbkdf2:sha256', salt_length=8):
        salt = hashlib.sha256(os.urandom(salt_length)).hexdigest().encode('ascii')
        pwdhash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
        pwdhash = binascii.hexlify(pwdhash)
        return (salt + pwdhash).decode('ascii')

    def check_password(self, pwhash, password):
        salt = pwhash[:64]
        stored_password = pwhash[64:]
        pwdhash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('ascii'), 100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
        return pwdhash == stored_password