import whisper
from faster_whisper import WhisperModel
from whisper import tokenizer
import io
from pyannote.audio import Pipeline
from pyannote.core import Segment, Annotation, Timeline
import subprocess
file_path = "backend/app/sounds/thing.mp4"
command = f"ffmpeg -i {file_path} -ab 160k -ac 2 -ar 44100 -vn backend/app/audio.wav"
subprocess.call(command, shell=True)