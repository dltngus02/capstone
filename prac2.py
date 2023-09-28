import threading
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from detect import detect_objects

app = Flask(__name__)
socketio = SocketIO(app)

# MySQL 데이터베이스 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:0000@localhost/capstone'
db = SQLAlchemy(app)

class AutoBill(db.Model):
    __tablename__ = 'capstone_database'
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    name = db.Column(db.String(255))
    image = db.Column(db.String(255))
    num = db.Column(db.Integer)

def get_thing_by_id(id):
   return AutoBill.query.get(id)

@app.route('/')
def index():
   return render_template('index.html')

def handle_detection():
   with app.app_context():  # Create an application context.
       product_list=[]
       for class_ids in detect_objects():
           for class_id in class_ids:
               product=get_thing_by_id(class_id)
               if product:
                   product_info={"id":product.id,"name":product.name,"price":product.price,"image":product.image,"num":product.num}
                   print(f"id:{product.id}, name:{product.name}, price :{product.price}, image :{product.image}, num :{product.num}")
                   socketio.emit('new_product', product_info)  # Send product info to client

if __name__ == "__main__":
   detection_thread=threading.Thread(target=handle_detection)
   detection_thread.start()
   socketio.run(app)
