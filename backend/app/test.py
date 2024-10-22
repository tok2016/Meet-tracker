from typing import Annotated, BinaryIO, Optional, Union, Iterable, Any
import whisper
from faster_whisper import WhisperModel
from whisper import tokenizer
import io


model_size = "large-v3"
# Run on GPU with FP16
model = WhisperModel(model_size, device="cpu", compute_type="int8")

def build_json_result( generator: Iterable[dict], info:  dict, ) -> dict[str, Any]:
    segments = [i for i in generator]
    return info | {
        "text": "\n".join(i["text"] for i in segments),
        "segments": segments,
    }


segments, info = model.transcribe("backend/app/sounds/thing.mp4")
x = ""
for segment in segments:
    x+=segment.text
    x+=" "
    #print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
print(x)