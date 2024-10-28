import whisper
from faster_whisper import WhisperModel
from whisper import tokenizer
import io
from pyannote.audio import Pipeline
from pyannote.core import Segment, Annotation, Timeline
import subprocess
#Whsiper модель
model_size = "large-v3"
model_whisper = WhisperModel(model_size, device="cpu", compute_type="int8")
#Pyannote
#segments, info = model_whisper.transcribe(io.BytesIO(file.file.read()), beam_size=5)
file_path = "backend/app/sounds/thing.mp4"
#command = f"ffmpeg -i {file_path} -ab 160k -ac 2 -ar 44100 -vn audio.wav"
#subprocess.call(command, shell=True)

segments, info = model_whisper.transcribe("backend/app/sounds/audio.wav", beam_size=5)
diarization_results = pipeline("backend/app/sounds/audio.wav")
#x = ""
#for segment in segments:
#    x+=segment.text
#    x+=" "
#print ( f"Transcribed text {x}" )
#print ( f"Diarization: {diarization_results}" )

def get_text_with_timestamp(transcribe_res):
    timestamp_texts = []
    for item in transcribe_res:
        start = item.start
        end = item.end
        text = item.text
        timestamp_texts.append((Segment(start, end), text))
    return timestamp_texts


def add_speaker_info_to_text(timestamp_texts, ann):
    spk_text = []
    for seg, text in timestamp_texts:
        spk = ann.crop(seg).argmax()
        spk_text.append((seg, spk, text))
    return spk_text


def merge_cache(text_cache):
    sentence = ''.join([item[-1] for item in text_cache])
    spk = text_cache[0][1]
    start = text_cache[0][0].start
    end = text_cache[-1][0].end
    return Segment(start, end), spk, sentence


PUNC_SENT_END = ['.', '?', '!']


def merge_sentence(spk_text):
    merged_spk_text = []
    pre_spk = None
    text_cache = []
    for seg, spk, text in spk_text:
        if spk != pre_spk and pre_spk is not None and len(text_cache) > 0:
            merged_spk_text.append(merge_cache(text_cache))
            text_cache = [(seg, spk, text)]
            pre_spk = spk

        elif text and len(text) > 0 and text[-1] in PUNC_SENT_END:
            text_cache.append((seg, spk, text))
            merged_spk_text.append(merge_cache(text_cache))
            text_cache = []
            pre_spk = spk
        else:
            text_cache.append((seg, spk, text))
            pre_spk = spk
    if len(text_cache) > 0:
        merged_spk_text.append(merge_cache(text_cache))
    return merged_spk_text


def diarize_text(transcribe_res, diarization_result):
    timestamp_texts = get_text_with_timestamp(transcribe_res)
    spk_text = add_speaker_info_to_text(timestamp_texts, diarization_result)
    res_processed = merge_sentence(spk_text)
    return res_processed


def write_to_txt(spk_sent, file):
    with open(file, 'w') as fp:
        for seg, spk, sentence in spk_sent:
            line = f'{seg.start:.2f} {seg.end:.2f} {spk} {sentence}\n'
            fp.write(line)

final_results = diarize_text(segments, diarization_results)

for seg, spk, sent in final_results:
    line = f'{seg.start:.2f} {seg.end:.2f} {spk} {sent}'
    print(line)