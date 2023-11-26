from flask import Blueprint, render_template, jsonify, request
from detect import detect_objects
from flask_socketio import emit
from app import db, socketio
from DB_models.model import AutoBill
from common.config import basic_path
from DB_models.model import Quantity

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