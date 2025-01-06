import asyncio
import logging
import dotenv
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters.command import Command
from aiogram.utils.keyboard import ReplyKeyboardBuilder, InlineKeyboardBuilder

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
async def func_contact(msg: types.Message):
    await msg.answer(f'Контакт:{msg.contact.phone_number}')

#@dp.callback_query(F.data=="share_contact")
#async def contacts(callback: types.CallbackQuery):
  #await callback.answer(
  #      text="Спасибо, что воспользовались ботом!",
  #      show_alert=True
  #  )
#  user_value = user_data.get(callback.from_user.id, 0)
#  await callback.answer( text=f"Ваш номер {user_value}")

# Хэндлер на команду /test1
@dp.message(Command("test1"))
async def cmd_test1(message: types.Message):
    await message.reply("Test 1")

# Хэндлер на команду /test2
async def cmd_test2(message: types.Message):
    await message.reply("Test 2")

# Запуск процесса поллинга новых апдейтов
async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
