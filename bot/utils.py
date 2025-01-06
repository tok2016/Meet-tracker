import json

def parse_summaryjson(json_text, string_text):
    dict_data = json.loads(json_text)
    dict_data_seg = dict_data["segments"]
    for segment in dict_data_seg:
        string_text += "Тема: " + f"{segment["topic"]}" +"\n"
        string_text = string_text + "Начало: " + f"{segment["start"]}," +"\n"
        string_text = string_text + "Конец: " + f"{segment["end"]}." +"\n"
        string_text = string_text + f"{segment["text"]}" +"\n"
        speakers_dict = segment["speakers"]
        for i in speakers_dict:
            string_text = string_text + f"{i["speaker_name"]}: " + f"{i["speaker_info"]}" +"\n"
        string_text += "\n"
    return string_text