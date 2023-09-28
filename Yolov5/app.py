from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, render_template
from flask_socketio import emit
from detect import detect_objects
from flask_socketio import SocketIO
from flask import request

app = Flask(__name__)
    # app.config['SECRET_KEY'] = 'your_secret_key'  # 비밀 키 설정

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
    return render_template('index.html')

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
                    "image": product.image,
                    "num": product.num
                }
                product_list.append(product_data)
                socketio.emit('update_product', product_data)
    return jsonify(item=product_list)

if __name__ == "__main__":

    socketio.run(app)
