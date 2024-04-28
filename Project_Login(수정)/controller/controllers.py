from flask import Blueprint, render_template, jsonify, request
from detect import detect_objects
from flask_socketio import emit
from app import db, socketio
from DB_models.model import AutoBill
from common.config import basic_path
from DB_models.model import Quantity
import random
from flask import session
bp = Blueprint('shopping',
                __name__,
                url_prefix='/')

@bp.route('/')
def main():
    return render_template('index.html')

@bp.route('/장바구니')
def shopping():
    return render_template('shopping.html')

@bp.route('/결제')
def payment():
    return render_template('payment.html')

@bp.route('/결제완료')
def thank():
    return render_template('thank.html')

@bp.route('/get_products')
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
                    "amount" :1,
                    "image": "../static/img/" + product.image.split('/')[-1],
                    "num": product.num
                }
                product_list.append(product_data)
                socketio.emit('update_product', product_data)
    return jsonify(item=product_list)

def get_thing_by_id(id):
    return AutoBill.query.get(id)
@bp.route('/get_random_products', methods=['GET'])
def get_random_products():
    try:
        recommendation = session.get('recommendation')
        # recommendation을 이용하여 필요한 작업 수행
        # 예시로, recommendation에 따라 다른 동작을 수행
        if recommendation == '1':
            all_products = AutoBill.query.all()
            quantitys = Quantity.query.all()
            product_list = []
            for product in all_products:
                print(product)
                product_data = {
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'image': product.image,
                }
                for q in quantitys:
                    if(product.name==q.name):
                        product_data['quantity'] = q.quantity
                        break
                product_list.append(product_data)
                
            sorted_product_data = sorted(product_list, key=lambda x: x['quantity'], reverse=True)[:3]
            for product_data in sorted_product_data:
                socketio.emit('recommend_product', product_data)
            return jsonify({'products': sorted_product_data})
      
        elif recommendation == '2':
            all_products = AutoBill.query.all()
            random_products = random.sample(all_products, min(len(all_products), 3))
            product_list = []
            for product in random_products:
                
                product_data = {
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'image': product.image,
                }
                product_list.append(product_data)
                socketio.emit('recommend_product', product_data)
            return jsonify({'products': product_list})

        elif recommendation == '3':
            all_products = AutoBill.query.all()
            quantitys = Quantity.query.all()
            product_list = []
            for product in all_products:
                print(product)
                product_data = {
                    'id': product.id,
                    'name': product.name,
                    'price': product.price,
                    'image': product.image,
                }
                for q in quantitys:
                    if(product.name==q.name):
                        product_data['quantity'] = q.quantity
                        break
                product_list.append(product_data)
                
            sorted_product_data = sorted(product_list, key=lambda x: x['quantity'])[:3]
            for product_data in sorted_product_data:
                socketio.emit('recommend_product', product_data)
            return jsonify({'products': sorted_product_data})
        else:
            pass
    except Exception as e:
        return jsonify({'error': str(e)})
@bp.route('/send_data', methods=['POST'])
def send_data():
    try:
        data = request.json
        # Handle the data as needed
        print("Received data:", data)
        product = {}
        for item in data:
            amount = item.get('amount')
            name = item.get('name')
            price = item.get('price')

            product[name] = amount
            if name and amount:
                # Update the quantity for the given name
                Quantity.query.filter_by(name=name).update({'quantity': Quantity.quantity - amount})
        db.session.commit()
        return jsonify(message='Data received successfully!')
    except Exception as e:
        return jsonify(error=str(e)), 500