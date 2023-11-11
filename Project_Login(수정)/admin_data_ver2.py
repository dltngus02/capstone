from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import os
import hashlib
import binascii

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:0000@localhost/capstone' # DB 수정
db = SQLAlchemy(app)


class Admin(db.Model, UserMixin):
    __tablename__ = 'administerss11' # 테이블 이름 각자 알아서

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


with app.app_context():
    db.create_all()

    # 사용자 ID와 비밀번호 리스트
    users = [(1, 'admin1@naver.com', 'hello111'), (2, 'admin2@naver.com', 'hello222'), (3, 'admin3@naver.com', 'hello333'), 
             (4, 'admin4@naver.com', 'hello444'), (5, 'admin5@naver.com', 'hello555'), (6, 'admin6@naver.com', 'hello666'), 
             (7, 'admin7@naver.com', 'hello777'), (8, 'admin8@naver.com', 'hello888'), (9, 'admin9@naver.com', 'hello999')]
    
    
    # 각 사용자에 대해 Admin 객체를 생성하고 데이터베이스에 추가
    for user_id, email, password in users:
        admin = Admin(id=user_id, email=email, password=password)
        db.session.add(admin)

    db.session.commit()

if __name__ == "__main__":
    app.run
