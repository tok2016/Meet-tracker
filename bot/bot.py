import asyncio
import logging
import dotenv
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters.command import Command
from aiogram.utils.keyboard import ReplyKeyboardBuilder, InlineKeyboardBuilder
from bot_db import authorize_user, get_users_summaries, get_summary
from utils import parse_summaryjson

# Включаем логирование, чтобы не пропустить важные сообщения
logging.basicConfig(level=logging.INFO)
# Объект бота
bot = Bot(token="7861682509:AAEOBF8bCbNIdqJ3WzvKHkHZSwOCNFDUf2w")
# Диспетчер
dp = Dispatcher()
user_data = {}
# Хэндлер на команду /start
@dp.message(Command("start"))
async def cmd_start(message: types.Message):
  builder = ReplyKeyboardBuilder()
  builder.row(types.KeyboardButton(text="Поделиться контактом", request_contact=True, callback_data ="share_contact"))
  await message.answer("Чтобы авторизироваться поделитесь своим контактом:", reply_markup=builder.as_markup(resize_keyboard=True))

@dp.message(F.contact)
async def func_contact(message: types.Message):
  builder = ReplyKeyboardBuilder()
  phone_number = message.contact.phone_number
  str_chat_id = str(message.chat.id)
  authorize = authorize_user(phone_number=phone_number[-10:], chat_id=str_chat_id)
  msg_answer = ""
  if authorize is not None:
    msg_answer += "Авторизация прошла успешно"
    builder.add(types.KeyboardButton(text="Просмотреть доступные резюме"))
    builder.add(types.KeyboardButton(text="Просмотреть текст резюме"))
  else:
    msg_answer += "Не получилось авторизироваться"
  await message.answer(text=f'{msg_answer}', reply_markup=builder.as_markup(resize_keyboard=True))

@dp.message(F.text.lower() == "просмотреть доступные резюме")
async def cmd_get_summaries(message: types.Message):
  summaries = get_users_summaries(message.chat.id)
  msg_text = ""
  if len(summaries) == 0:
    msg = "У вас нет резюме"
  else:
    for summary in summaries:
      msg_text+= summary[0] + ", "
  await message.reply(f'Доступные резюме: {msg_text}')

@dp.message(F.text.lower() == "просмотреть текст резюме")
async def cmd_get_summary(message: types.Message):
  summaries = get_users_summaries(message.chat.id)
  builder = InlineKeyboardBuilder()
  for summary in summaries:
      builder.add(types.InlineKeyboardButton(
        text=f"{summary[0]}",
        callback_data=f"summary_id_{summary[1]}")
    )
  await message.reply("Выберите резюме текст которого вы хотите получить", reply_markup=builder.as_markup())

@dp.callback_query(F.data.startswith("summary_id_"))
async def callback_get_summary(callback: types.CallbackQuery):
  summary_id = callback.data.split("_")[2]
  summary_text = get_summary(summary_id=summary_id)
  summary_parsed = ""
  summary_parsed = parse_summaryjson(summary_text[0], summary_parsed)
  await callback.message.answer( text=f"Текст резюме:\n{summary_parsed}", )

# Запуск процесса поллинга новых апдейтов
async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
