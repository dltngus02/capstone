import os
import shutil
import random

import mysql.connector
from mysql.connector.errors import IntegrityError

# MySQL 연결 정보 설정
db_config = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "gusdn0228",
    "database": "auto_bill",
    'connection_timeout': 999999
}


# table 이름 설정해야함 ★
tbl_name = '물건_가격_테이블'

# 주문table 이름 설정해야함 ★
order_tbl_name = '물건_양_테이블'

# 전시용 사진 경로 설정 ★
new_data_dir = "C:/Users/User/Desktop/capstonePic/pic/product/전시용사진"

# MySQL 연결 생성
conn = mysql.connector.connect(**db_config)

# 커서 생성
cursor = conn.cursor()


# 데이터 삽입 쿼리 생성
insert_query = "INSERT INTO {} (id, price, name, image, num) VALUES (%s, %s, %s, %s, %s)".format(tbl_name)

# ID에 대한 이름 매핑
name_mapping = {
    100: "고래밥",
    101: "소금빵",
    102: "에이스(크림)",
    103: "딸기 웨하스",
    104: "웨하스",
    105: "초코빵",
    106: "초코송이",
    107: "초코칩 쿠키",
    108: "칸쵸",
    109: "포테토칩",
    110: "데미소다(복숭아)",
    111: "데미소다(사과)",
    112: "마운틴듀",
    113: "밀키스",
    114: "박카스",
    115: "박카스(디카페인)",
    116: "탐스(키위)",
    117: "탐스(파인애플)",
    118: "펩시",
    119: "펩시(제로)"
    # 추가적인 ID와 이름을 지정해주세요
}

# 디렉토리에서 파일 읽어오고 이미지 복사 및 데이터 삽입
for filename in os.listdir(new_data_dir):
    # 파일 이름에서 id 추출
    id = int(filename.split('.')[0])
    # price를 1000에서 5000 사이의 랜덤한 값으로 설정
    price = random.randint(1000, 5000)
    # num을 id와 같게 설정
    num = id
    # ID에 맞는 이름 매핑
    name = name_mapping.get(id, f"Product_{id}")
    
    # 이미지를 복사할 경로 설정
    source_path = os.path.join(new_data_dir, filename)
    # 이미지를 저장할 경로 설정
    destination_path = f"C:/Users/User/Desktop/vscode/capstone/Project_Login(수정)/static/img/{filename}"
    # 이미지를 목적지로 복사
    shutil.copyfile(source_path, destination_path)
    # 데이터베이스에 삽입
    try:
        cursor.execute(insert_query, (id, price, name, destination_path, num))
        conn.commit()
        print(f"ID {id}에 대한 데이터가 성공적으로 삽입되었습니다.")
    except IntegrityError:
        print(f"ID {id}에 대한 데이터는 이미 존재합니다.")
        continue

# 데이터 삽입 쿼리 생성
insert_query = "INSERT INTO {} (id, name, quantity) VALUES (%s, %s, %s)".format(order_tbl_name)


# 디렉토리에서 파일 읽어오고 이미지 복사 및 데이터 삽입
for filename in os.listdir(new_data_dir):
    # 파일 이름에서 id 추출
    id = int(filename.split('.')[0])
    # num을 id와 같게 설정
    num = 50
    # ID에 맞는 이름 매핑
    name = name_mapping.get(id, f"Product_{id}")

    # 데이터베이스에 삽입
    try:
        cursor.execute(insert_query, (id, name, 50))
        conn.commit()
        print(f"ID {id}에 대한 데이터가 성공적으로 삽입되었습니다.")
    except IntegrityError:
        print(f"ID {id}에 대한 데이터는 이미 존재합니다.")
        continue


# 연결 닫기
conn.close()
