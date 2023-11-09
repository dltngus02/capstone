# 사용 라이브러리 : zipfile, xml.etree.ElementTree as ET, pandas, mysql.connector, sqlalchemy's import create_engine, PIL's import Image
# base64, io's import BytesIO, io, re, random, mysql.connector's IntegrityError

# develop environment : Aanaconda's Jupyter notebook python 3.10.11

# 사용 API : Vertual AI's Jupyter Notebook, GCP, Apache Beam, Cloud Storage, Big Query, VM Instance, Data Flow

# 코드 이용시 주의사항 : Aanaconda's Jupyter NoteBook으로 작업을 하여서, 파일 다운로드 path나 API's Key 경로는 local에서 진행시 각 체제의 맞게 변경 바람!!

# 사용시 입력해야하는 정보는 ★ 주석 처리 하였으니 꼭 필독하기 바람!!
#========================================================================================================================================================================
#========================================================================================================================================================================
import zipfile
import xml.etree.ElementTree as ET
import mysql.connector
from sqlalchemy import create_engine
from PIL import Image
import base64
from io import BytesIO
import io
import re
import random
from mysql.connector import IntegrityError
import pandas as pd

prices = []
# 100개의 가격을 랜덤하게 생성하여 리스트에 추가
for _ in range(100):
    price = random.randint(1000, 3000)  # 1000에서 3000 사이의 랜덤한 정수
    price = price // 100 * 100  # 100원 단위로 만들기
    prices.append(price)

# mySQL config정보 입력 ★
db_config = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "gusdn0228",
    "database": "auto_bill",
    'connection_timeout': 999999999 # SQL 연결 시간 최대 설정
}



img_path_list = []
temp_list = []

# zip에서 사진 다운 경로를 지정해야함, 이미지 저장할 디렉토리 하나 만들고 지정하길 바람 ★
download_path = "C:/Users/User/Desktop/vscode/capstone/Project_MVC/static/img"  

# AI ZIP 파일 데이터 경로 지정해야함 ★
basic_file = 'C:/Users/User/Desktop/2학기/캡스톤 과제/cap_project/Store_Item_Datasets.zip'

zip_file_path = basic_file
# 압축 파일 열기
with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
    # 압축 파일 내의 모든 파일 및 폴더 목록 가져오기
    file_list = zip_ref.namelist()

    # 폴더 이름과 해당 폴더에서 txt 파일 내용을 저장할 딕셔너리 생성
    folder_txt_dict = {}
    folder_image_list = []
    for item in file_list:
        # '/' 문자를 기준으로 파일 경로를 분할하여 첫 번째 요소를 폴더 이름으로 추출
        folder_name = item.split('/')[-1].encode('cp437').decode('cp949')
        if item.endswith('.txt'):
            if folder_name not in folder_txt_dict:
                folder_txt_dict[folder_name] = []
            # txt 파일 내용 읽어오기 (적절한 인코딩 사용)
            try:
                txt_data = zip_ref.read(item).decode('utf-8')  # 파일 내용을 UTF-8로 디코딩
            except UnicodeDecodeError:
                # 인코딩이 다르다면 다른 인코딩으로 시도
                txt_data = zip_ref.read(item).decode('cp949')  # 예: cp949 인코딩 사용
            folder_txt_dict[folder_name].append(txt_data)
        if re.match(r'.*_(0|00)_s_(2|1).jpg$', item):
            image_data = zip_ref.read(item)
            download_file_path_s1 = f"{download_path}/{item.split('/')[-1].replace('_s_2.jpg', '_s_1.jpg')}"
            with open(download_file_path_s1, 'wb') as image_file_s1:
                image_file_s1.write(image_data)
                if f"{download_path}/{item.split('/')[-1].replace('_s_2.jpg', '_s_1.jpg')}" not in folder_image_list:
                    folder_image_list.append(f"{download_path}/{item.split('/')[-1].replace('_s_2.jpg', '_s_1.jpg')}")
                    
        if item.endswith('30140_00_s_3.jpg'):
            image_data = zip_ref.read(item)
            download_file_path_s1 = f"{download_path}/{item.split('/')[-1].replace('_s_2.jpg', '_s_1.jpg')}"
            with open(download_file_path_s1, 'wb') as image_file_s1:
                image_file_s1.write(image_data)
                if f"{download_path}/{item.split('/')[-1]}" not in folder_image_list:
                    folder_image_list.append(f"{download_path}/{item.split('/')[-1]}")

# 각 폴더의 txt 파일 내용을 Pandas 데이터프레임으로 읽어오기
dataframes = {}

for folder_name, txt_list in folder_txt_dict.items():
    # txt_list를 하나의 문자열로 결합
    if folder_name.endswith("클래스 번호.txt"):
        txt_combined = '\r'.join(txt_list)
        temp_list.append(txt_combined.split('\r\n'))

temp_list = [item for sublist in temp_list for item in sublist if item.strip() != '']
things_dict = {}
thing_num = []

for thing in temp_list:
    temp = thing.split(':')
    name = temp[0]
    thing_num.append(name.split('_')[0])
    name = name.split('_')[-1]
    class_num = temp[-1].strip()
    things_dict[int(class_num)] = name


img_data = []

for num in thing_num:
    for img in folder_image_list:
        if num in img:
            img_data.append(img)
data = {
     "id" : list(things_dict.keys()),
     "name" : list(things_dict.values()),
     "num" : thing_num,
     "img_path" : img_data,
     "price" : prices
}
df = pd.DataFrame(data)


# MySQL 연결 생성
conn = mysql.connector.connect(**db_config)

# db에 만들 table 이름 설정해야함 ★
tbl_name = '물건22'
# db에 만들 주문table 이름 설정해야함 ★
order_tbl_name = '주문_물건'


# 커서 생성
cursor = conn.cursor()

# 데이터베이스 생성 (이미 존재하는 경우 무시)
create_database_query = f"CREATE DATABASE IF NOT EXISTS {db_config['database']}"
cursor.execute(create_database_query)

# 데이터베이스 선택
conn.database = db_config["database"]

# 테이블 생성 (물건)
create_table_query = """
CREATE TABLE IF NOT EXISTS {} (
    id int PRIMARY KEY,
    price int,
    name VARCHAR(255),
    image VARCHAR(255),
    num int
)
""".format(tbl_name)
cursor.execute(create_table_query)

insert_query = "INSERT INTO {name} (id, price, name, image, num) VALUES (%s, %s, %s, %s, %s)".format(name=tbl_name)

for i in range(df.shape[0]):
     try:
         # 데이터프레임을 튜플의 리스트로 변환
        data_to_insert = [(row['id'], row['price'], row['name'], row['img_path'], row['num']) for index,row in df.iterrows()]
        cursor.executemany(insert_query, data_to_insert)
     except IntegrityError:
        print("이미 있는 데이터 입니다.")
        break


# 테이블 생성 (물건)
create_table_query = """
CREATE TABLE IF NOT EXISTS {name} (
    id int not null,
    quantity int,
    order_day int,
    order_price int,
    foreign key (id) references {reference}(id)
)
""".format(name=order_tbl_name, reference=tbl_name)
cursor.execute(create_table_query)

insert_query = "INSERT INTO {name} (id, quantity) select id, 50 from {reference} where id not in (select id from {name})".format(name=order_tbl_name, reference=tbl_name)
cursor.execute(insert_query)

# 변경사항 저장 및 연결 닫기
conn.commit()
conn.close()

print("데이터베이스와 테이블이 생성되고 데이터가 입력되었습니다.")
