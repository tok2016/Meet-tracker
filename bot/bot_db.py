import psycopg2
from psycopg2 import Error
import os, logging
from dotenv import load_dotenv

logging.basicConfig(
    filename='bot/db.log', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO, encoding="utf-8"
)

load_dotenv()

POSTGRES_USER = os.environ.get("POSTGRES_USER")
POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
POSTGRES_SERVER = os.environ.get("POSTGRES_SERVER")
POSTGRES_PORT = os.environ.get("POSTGRES_PORT")
POSTGRES_DB = os.environ.get("POSTGRES_DB")

psql_url = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

def connect_to_db():
    try:
        connection = psycopg2.connect(psql_url)
    except (Exception, Error) as error:
        logging.error(f"Ошибка подключения к базе данных")
    cursor = connection.cursor()
    return cursor, connection

def authorize_user(phone_number: str, chat_id: str):
    cursor, connection = connect_to_db()
    cursor.execute("SELECT id FROM public.user WHERE phone_number = %s", [phone_number])
    data = cursor.fetchone()
    if data is not None:
        cursor.execute("UPDATE public.user SET chat_id = %s WHERE id = %s", (chat_id, data[0]))
        connection.commit()
    cursor.close()
    connection.close()
    return data

def get_users_summaries(chat_id):
  cursor, connection = connect_to_db()
  user_id = get_user_id(chat_id=chat_id)
  query = "SELECT summary.title from public.summary WHERE summary.user_id = %s;"
  cursor.execute(query, (user_id))
  data = cursor.fetchall()
  cursor.close()
  connection.close()
  return data

def get_user_id(chat_id: int):
    cursor, connection = connect_to_db()
    query = "SELECT id from public.user WHERE chat_id = %s;"
    cursor.execute(query, [str(chat_id)])
    data = cursor.fetchone()
    cursor.close()
    connection.close()
    return data