from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:0000@localhost/capstone'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class Admin(db.Model):
    __tablename__ = 'administers'

    id = db.Column(db.String(64), primary_key=True)
    password = db.Column(db.String(128))

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

with app.app_context():
    db.create_all()

    # 사용자 ID와 비밀번호 리스트
    users = [('admin1', '1111'), ('admin2', '2222'), ('admin3', '3333'), 
             ('admin4', '4444'), ('admin5', '5555'), ('admin6', '6666'), 
             ('admin7', '7777'), ('admin8', '8888'), ('admin9', '9999')]

    # 각 사용자에 대해 Admin 객체를 생성하고 데이터베이스에 추가
    for user_id, password in users:
        admin = Admin(id=user_id)
        admin.set_password(password)
        db.session.add(admin)

    db.session.commit()

if __name__ == "__main__":
    app.run(debug=True)
