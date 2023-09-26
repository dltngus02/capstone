from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify


app = Flask(__name__)

# MySQL 데이터베이스 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:{password}@localhost/{database}' # ★
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

# AI 모델에서 물건을 인식하고 id 변수에다가 id값을 받아오는 로직을 구현해 주세요
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
