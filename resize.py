import os
import cv2

# 원본 이미지가 있는 디렉토리
input_directory = r"C:\Users\user\Desktop\drink\demisoda"

# resize된 이미지를 저장할 디렉토리
output_directory = r"C:\Users\user\Desktop\drink\demisoda_resized"

# resize할 너비와 높이pi
new_width = 1500
new_height = 2000

# 출력 디렉토리가 없으면 생성
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# 디렉토리 안의 모든 파일에 대해 작업
for filename in os.listdir(input_directory):
    if filename.endswith(".jpg") or filename.endswith(".png"):  # jpg 또는 png 확장자 파일인 경우에만 작업
        # 이미지 파일 경로
        # image_path = input_directory + "/" + filename
        image_path = os.path.join(input_directory, filename)
        print(image_path)
        # 이미지 읽기
        image = cv2.imread(image_path)
        
        # 이미지 resize
        resized_image = cv2.resize(image, (new_width, new_height))
        
        # 새로운 파일 경로 설정
        output_path = os.path.join(output_directory, filename)
        
        # resize된 이미지 저장
        cv2.imwrite(output_path, resized_image)
        
        print(f"{filename} 이미지를 resize하여 저장했습니다.")

print("모든 이미지의 resize 작업이 완료되었습니다.")
