from cryptography.fernet import Fernet

host="localhost"
user="root"
password="Hamad12345"
database="filesystem"
port = 3306


encryption_key = b'BpthmmKROjL-bMMnZD8h-jye-ZJN6cY7z-QB3ms_qD0='
cipher = Fernet(encryption_key)