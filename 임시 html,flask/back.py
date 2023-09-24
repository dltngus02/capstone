from flask import Flask, render_template

app = Flask(__name__)

# 예제 데이터 (실제로 데이터베이스에서 데이터를 가져와야 합니다)
products = [
    {"id": 1, "price": 100, "name": "Product 1", "image": "1.jpg", "num": 5},
    {"id": 2, "price": 200, "name": "Product 2", "image": "2.jpg", "num": 10},
    {"id": 3, "price": 150, "name": "Product 3", "image": "3.jpg", "num": 3},
]
path ="static/img/" #이미지 위치 넣어주는 부분

@app.route('/')
def index():
    return render_template('index.html', products=products, path=path) #인자로 객체(db에서 받아올거) 랑 path 넣어줌

if __name__ == '__main__':
    app.run(debug=True)