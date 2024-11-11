import re

summary_common = "content='' additional_kwargs={} response_metadata={} id='run-7a6c305b-38d7-4f81-91bd-5bff5e646b01-0' tool_calls=[{'name': 'summarize_text', 'args': {'topic': 'Conversation between family members', 'text': 'The conversation is about a person who is feeling down and their loved ones trying to comfort them.', 'start': '0.0', 'end': '20.14', 'speakers': 'SPEAKER_02, SPEAKER_00, SPEAKER_03'}, 'id': 'call_6c90d255c518452d800fc54711d70a74', 'type': 'tool_call'}]"

#summary1 = re.split("'args':", summary_common)
#summary2 = re.search(r"'args': (.*?), 'id':", summary_common).group(1)
#text = re.search(r"'text': '(.*?)', 'start'", summary_common)
#new_text = re.sub(r"'text': '(.*?)', 'start'", "Hiii", summary_common)
new_text = re.sub(r"(?<='text': ').+?(?=', 'start')", "Hiii", summary_common)
#r'(?<=<title>).+?(?=</title>)'
print(new_text)