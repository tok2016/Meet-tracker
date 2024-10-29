from faster_whisper import WhisperModel
import io
from pyannote.audio import Pipeline
from pyannote.core import Segment, Annotation, Timeline
import subprocess
from langchain_ollama import OllamaLLM
from app.utils import diarize_text
from app.hf_token import auth_token_hf
from pydub import AudioSegment
#Whsiper модель
model_size = "large-v3"
model_whisper = WhisperModel(model_size, device="cpu", compute_type="int8")
#Llama модель
model_llama = OllamaLLM(model="llama3.1")
pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token=auth_token_hf)
#Pyannote
#segments, info = model_whisper.transcribe(io.BytesIO(file.file.read()), beam_size=5)
file_path = "backend/app/sounds/thing.mp4"
audio = AudioSegment.from_file(file_path, "mp4")
f = io.BytesIO()
audio.export(f, format="wav")
f.name = "test.wav"
#command = f"ffmpeg -i {file_path} -ab 160k -ac 2 -ar 44100 -vn audio.wav"
#subprocess.call(command, shell=True)

segments, info = model_whisper.transcribe(f, beam_size=5)
diarization_results = pipeline(f)
#x = ""
#for segment in segments:
#    x+=segment.text
#    x+=" "
#print ( f"Transcribed text {x}" )
#print ( f"Diarization: {diarization_results}" 

final_results = diarize_text(segments, diarization_results)

lines = []
for seg, spk, sent in final_results:
    line = f'{spk} {sent}'
    lines.append(line)
    #print(line)

summary = model_llama.invoke(f"Обобщи текст по каждому пользователю {lines}")

print(summary)
