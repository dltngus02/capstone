from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify


app = Flask(__name__)

# MySQL 데이터베이스 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:gusdn0228@localhost/auto_bill'
db = SQLAlchemy(app)

class AutoBill(db.Model):
    __tablename__ = '{table name}' # ★
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    name = db.Column(db.String(255))
    image = db.Column(db.String(255))  # 이미지 파일 경로를 저장
    num = db.Column(db.Integer)  # num 컬럼 추가

    def __init__(self, price, name, image, num):
        self.price = price
        self.name = name
        self.image = image  # 이미지 파일 경로 저장
        self.num = num  # num 값 저장
def get_all_thing():
    return AutoBill.query.all()

# 이 함수에서 AI에서 id 값을 받아와서 쿼리값을 출력하는 로직 구현
#def get_info_from_AI():


@app.route('/')
def index():
    product_list = []
    product = get_all_thing()
    # 데이터를 JSON 형식으로 변환하여 반환
    for item in product:
            product_list.append({"id": item.id, "name": item.name, "price": item.price, "image": item.image, "num": item.num})
    return jsonify(item=product_list)


if __name__ == "__main__":
    app.run()
