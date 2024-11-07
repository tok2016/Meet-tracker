#!/bin/sh

# Start Ollama in the background
ollama serve &

# Wait for Ollama to start
sleep 5

# Pull and run llama
ollama run "llama3.1"

fastapi run app/main.py --port 80