from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify
from detect import detect_objects

app = Flask(__name__)

# MySQL 데이터베이스 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:0000@localhost/capstone' # ★
db = SQLAlchemy(app)

class AutoBill(db.Model):
    __tablename__ = 'capstone_database' # ★
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

def get_thing_by_id(id):
   return AutoBill.query.get(id)

@app.route('/')
def index():
   product_list=[]
   for class_ids in detect_objects():
       for class_id in class_ids:
           product=get_thing_by_id(class_id)
           if product:
               product_list.append({"id":product.id,"name":product.name,"price":product.price,"image":product.image,"num":product.num})
               print(f"id:{product.id}, name:{product.name}, price :{product.price}, image :{product.image}, num :{product.num}")
   return jsonify(item=product_list)


if __name__ == "__main__":
   app.run()
