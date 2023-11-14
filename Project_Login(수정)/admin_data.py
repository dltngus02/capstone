from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:gusdn0228@localhost/auto_bill'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class Admin(db.Model):
    __tablename__ = 'administerss11'

    id = db.Column(db.String(64), primary_key=True)
    password = db.Column(db.String(128))

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

with app.app_context():
    db.create_all()

    # 사용자 ID와 비밀번호 리스트
    users = [('admin1', 'hello111'), ('admin2', 'hello222'), ('admin3', 'hello333'), 
             ('admin4', 'hello444'), ('admin5', 'hello555'), ('admin6', 'hello666'), 
             ('admin7', 'hello777'), ('admin8', 'hello888'), ('admin9', 'hello999')]
    
    
    # 각 사용자에 대해 Admin 객체를 생성하고 데이터베이스에 추가
    for user_id, password in users:
        admin = Admin(id=user_id)
        admin.set_password(password)
        db.session.add(admin)

    db.session.commit()

if __name__ == "__main__":
    app.run(debug=True)
