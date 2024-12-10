from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    llm_model: str = "ilyagusev/saiga_llama3"
    whisper_model: str = "large-v3"
    whisper_device: str = "cpu"
    whisper_compute: str = "int8"
    diarize_type: str = "Neural"
    app_name: str = "Awesome API"
    main_color: str = '#F59D0E'
    secondary_color: str = '#F56B00'
    tertiary_color: str = '#F5F5F5'
    quaternary_color: str = '#E7E7E7'
    disabled_color: str = '#8B8B8B'
    background_color: str = '#FFFFFF'
    text_main_color: str = '#000000'
    text_secondary_color: str = '#8B8B8B'
    text_highlight_color: str = '#F59D0E'
    text_contrast_color: str = '#FFFFFF'
    error_color: str = '#EE1313'

settings = Settings()