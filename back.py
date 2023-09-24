from flask import Flask, render_template

app = Flask(__name__)

# 예제 데이터 (실제로 데이터베이스에서 데이터를 가져와야 합니다)
products = [
    {"id": 1, "price": 100, "name": "Product 1", "image": "1.jpg", "num": 5},
    {"id": 2, "price": 200, "name": "Product 2", "image": "2.jpg", "num": 10},
    {"id": 3, "price": 150, "name": "Product 3", "image": "3.jpg", "num": 3},
]
path = "C:/Users/이수현/Desktop/flask/image/"


@app.route('/')
def index():
    return render_template('index.html', products=products, path=path)

if __name__ == '__main__':
    app.run(debug=True)