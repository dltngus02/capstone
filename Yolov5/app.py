from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, render_template
from flask_socketio import emit
from detect import detect_objects
from flask_socketio import SocketIO
from flask import request

app = Flask(__name__)
    # app.config['SECRET_KEY'] = 'your_secret_key'  # 비밀 키 설정
basic_path = "./static/"

# MySQL 데이터베이스 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:gusdn0228@localhost/auto_bill'
db = SQLAlchemy(app)
socketio = SocketIO(app)


class AutoBill(db.Model):
    __tablename__ = '물건20'
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

def get_thing_by_id(id):
    return AutoBill.query.get(id)

@app.route('/')
def index():
    return render_template('index.html2')


# /get_products의 주소에 접근해야 웹캠 함수가 작동 됨, 실시간 데이터는 루트(/)라우터에 표시되기 때문에
# get_products주소에 들어간후 새창으로 다시 /에 돌아온 후에 물건을 인식하면 작동이 잘 될꺼임
# index.html에서 socket.on 부분이 데이터를 받는 곳이기 때문에 이 부분을 이쁘게 만들어 주기 바람
@app.route('/get_products')
def get_products():
    product_list = []
    for class_ids in detect_objects():
        for class_id in class_ids:
            product = get_thing_by_id(class_id)
            if product:
                product_data = {
                    "id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "image": basic_path + product.image.split('/')[-1],
                    "num": product.num
                }
                product_list.append(product_data)
                socketio.emit('update_product', product_data)
    return jsonify(item=product_list)


# 결제 라우터를 추가해서 get_prodicts를 실행하면 /결제 페이지에서 데이터를 나오게 추가함
@app.route('/결재')
def index2():
    return render_template('index.html')

if __name__ == "__main__":

    socketio.run(app)
