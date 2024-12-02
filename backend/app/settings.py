from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    llm_model: str = "ilyagusev/saiga_llama3"
    whisper_model: str = "large-v3"
    whisper_device: str = "cpu"
    whisper_compute: str = "int8"
    diarize_type: str = "Neural"
    app_name: str = "Awesome API"

settings = Settings()