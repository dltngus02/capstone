#### main.py에서 실행 ####
from detect import detect_objects

for new_detected_class_ids in detect_objects():
    print("New Detected Class IDs:", new_detected_class_ids)
