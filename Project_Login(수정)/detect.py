########### 혹시 best.pt 파일이 다른 위치에 있다면 절대경로로 best.pt파일 위치 수정할 것 ###########
###########    동일폴더에 best.pt가 있다면 그대로 사용                     #######################
# torch 2.0.1 ---> pip install torch==2.0.1
# cv2 ---> pip install opencv-python
# import torch
# import cv2

# ##### frame_difference=40으로 설정해서 동일 객체에 대해서 중복 추가 X #####
# ##### confidence_threshold로 정확도 낮은 객체는 추가 X #####
# def detect_objects(frame_difference=40, confidence_threshold=0.50):
#     model = torch.hub.load('ultralytics/yolov5', 'custom', 'C:/Users/User/Desktop/실험/capstone/Project_Login(수정)/best.pt')
#     # 웹캠을 활용해 인식할 때
#     # cap = cv2.VideoCapture(0)
    
#     # 라즈베리파이 MJSTREAMING URL 주소의 영상 인식할 때
#     cap = cv2.VideoCapture("http://192.168.137.102:8090/?action=stream")

#     # Set the webcam resolution to 640x360.
#     cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
#     cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

#     frame_count = 0  
#     class_id_dict = {}  

#     while cap.isOpened():
#         ret, frame = cap.read()

#         if not ret:
#             print("Can't receive frame (stream end?). Exiting ...")
#             break

#         frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#         results = model([frame_rgb])

#         # Filter out results with confidence less than the threshold.
#         confidences, class_ids_current_frame = results.xyxy[0][:,-2:], [int(i) for i in results.xyxy[0][results.xyxy[0][:,-2] > confidence_threshold][:,-1]]

#         result_frame = results.render() 
#         result_frame_bgr = cv2.cvtColor(result_frame[0], cv2.COLOR_RGB2BGR)
#         cv2.imshow('YOLOv5 Object Detection', result_frame_bgr)

#         if cv2.waitKey(1) == ord('q'):  
#             break

#         new_class_ids_detected=[]
#         for class_id in class_ids_current_frame:
#             if class_id not in class_id_dict or (frame_count - class_id_dict[class_id]) > frame_difference:
#                 class_id_dict[class_id] = frame_count
#                 new_class_ids_detected.append(class_id)

#         frame_count += 1

#         if new_class_ids_detected:
#             yield new_class_ids_detected  

#     cap.release()
#     cv2.destroyAllWindows()

import torch
import cv2

def detect_objects(frame_difference=40, confidence_threshold=0.4):
    model = torch.hub.load('ultralytics/yolov5', 'custom', 'C:/Users/leesuhyeon/Desktop/2024 1학기 과제/캡디/캡디6/Project_Login(수정)/best.pt')
   
    cap = cv2.VideoCapture(0)
    # cap = cv2.VideoCapture("http://192.168.137.102:8090/?action=stream")

    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    frame_count = 0
    class_id_dict = {}

    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            print("Can't receive frame (stream end?). Exiting ...")
            break

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        if frame_count % 10 == 0:
            results = model([frame_rgb])

            confidences, class_ids_current_frame = results.xyxy[0][:,-2:], [int(i) for i in results.xyxy[0][results.xyxy[0][:,-2] > confidence_threshold][:,-1]]

            result_frame = results.render()
            result_frame_bgr = cv2.cvtColor(result_frame[0], cv2.COLOR_RGB2BGR)
            cv2.imshow('YOLOv5 Object Detection', result_frame_bgr)

            new_class_ids_detected=[]
            for class_id in class_ids_current_frame:
                class_id +=100
                if class_id not in class_id_dict or (frame_count - class_id_dict[class_id]) > frame_difference:
                    class_id_dict[class_id] = frame_count
                    new_class_ids_detected.append(class_id)
            if new_class_ids_detected:
                yield new_class_ids_detected

        frame_count += 1

        if cv2.waitKey(1) == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

