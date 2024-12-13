#from .ollama_functions import OllamaFunctions
#from langchain_ollama import OllamaLLM

#Whsiper модель
#model_size = "large-v3"
#Llama модель
#model = OllamaLLM(model="ilyagusev/saiga_llama3", format="json", base_url="http://127.0.0.1:11434/")
#text = "Start - 00:00. End - 27:00. Speaker 1: Я только сейчас понял, что менять структуру JSON не стоит от слова совсем.  Может, на бэке ее не очень сложно поменять, но у меня с TypeScript реализовать это нереалистично.  Speaker 0: Ну, как вариант, можно это реализовать с большим красным текстом, не рекомендовано. Speaker 1: А я это уже сверстал.  Сверстал и не подумал, что это полнейшая чушь, ибо фронтенд придется вручную менять каждый раз.  "
text = """
{
  "text": "Организация работы команды на проекте, обсуждение технических требований и инструментов для разработки, планирование встреч и отчетности. Обсуждение цвета бренда CSB и возможности его настройки пользователем.",
  "topic": "Работа над проектом",
  "start": "00:00:00,000",
  "end": "00:27:16,620",
  "speakers":
    [
      {
        "speaker_name": "Speaker 0",
        "speaker_info": "Представил себя и команду, обсудил цель проекта и его ключевые особенности. Предложил инструменты для управления задачами (Яндекс Трекер) и контроля версий (GitHub). Обсудил формат отчетности и возможности настройки цвета бренда CSB."
      },
      {
        "speaker_name": "Speaker 1",
        "speaker_info": "Выразил поддержку идеи проекта, представил опыт работы с аналогичным проектом. Обсудил технические детали проекта и выбранный стек технологий."
      },
      {
        "speaker_name": "Speaker 2",
        "speaker_info": "Участник команды Паши, занимается аналитикой в команде."
      },
      {
        "speaker_name": "Speaker 3",
        "speaker_info": "Приветствовал идею проекта и представил себя как дизайнера. Участник команды Паши."
      }
    ]
    }
"""
text3 = """
{
"text": "Обсуждение процесса создания и оптимизации резюме на русском языке с использованием моделей распознавания речи, а также настройка процессов в системе.",
"topic": "Оптимизация резюме",
"start": "00:00:03",
"end": "00:07:43",
"speakers": [
{
"speaker_name": "Speaker 0",
"speaker_info": "Обсуждает общее состояние работы и задачи."
},
{
"speaker_name": "Speaker 1",
"speaker_info": "Рассказывает о проблемах в работе с моделями распознавания речи, обновлении тега, использовании пользовательской ламы и оптимизации процесса."
},
{
"speaker_name": "Speaker 2",
"speaker_info": "Поддерживает диалог, уточняет детали и предлагает идеи по ускорению процессов."
}
]
}
"""
text1 = '"text": "{\n  \"text\": \"Краткое содержание текста: Дискуссия о правильности изменения структуры JSON. Один из участников утверждает, что это не стоит делать, так как реализация на TypeScript может быть сложной. Другой спикер предлагает временное решение с использованием большого красного текста.\",\n  \"topic\": \"Изменение структуры JSON\",\n  \"start\": \"00:00:00\",\n  \"end\": \"00:00:26,680\",\n  \"speakers\":\n    [\n      {\n        \"speaker_name\": \"Speaker 1\",\n        \"speaker_info\": \"Утверждает, что изменять структуру JSON не стоит от слова совсем, так как это может быть сложно реализовать с TypeScript.\"\n      },\n      {\n        \"speaker_name\": \"Speaker 0\",\n        \"speaker_info\": \"Предлагает временное решение с использованием большого красного текста.\"\n      }\n    ]\n}" '
import json
#print(json.dumps(text, ensure_ascii=True, sort_keys=True, indent=4, separators=(',', ': ')) )
dictData = json.loads(text)
#print(dictData["topic"])
string_desc = ''
string_desc = string_desc + "Тема: " + f"{dictData["topic"]}" +"\n"
string_desc = string_desc + "Начало: " + f"{dictData["start"]}," +"\n"
string_desc = string_desc + "Конец: " + f"{dictData["end"]}." +"\n"
string_desc = string_desc + f"{dictData["text"]}" +"\n"
#string_desc = string_desc + "Спикеры: " + f"{dictData["end"]}." +"\n"
#print(string_desc)
speakers_dict = dictData["speakers"]
for i in speakers_dict:
  string_desc = string_desc + f"{i["speaker_name"]}: " + f"{i["speaker_info"]}" +"\n"
#print(string_desc)

def parse_summaryjson(json_text, string_text):
  dict_data = json.loads(json_text)
  string_text = string_text + "Тема: " + f"{dictData["topic"]}" +"\n"
  string_text = string_text + "Начало: " + f"{dictData["start"]}," +"\n"
  string_text = string_text + "Конец: " + f"{dictData["end"]}." +"\n"
  string_text = string_text + f"{dictData["text"]}" +"\n"
  speakers_dict = dict_data["speakers"]
  for i in speakers_dict:
    string_text = string_text + f"{i["speaker_name"]}: " + f"{i["speaker_info"]}" +"\n"
  return string_text

string_text1 = ''
print(parse_summaryjson(text3, string_text1))