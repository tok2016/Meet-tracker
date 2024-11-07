FROM python:3.10

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt


RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

RUN curl -fsSL https://ollama.com/install.sh | sh

#RUN ollama serve & sleep 5 && ollama run llama3.1
RUN ollama serve & sleep 5

EXPOSE 90
EXPOSE 11434
COPY ./start_services.sh /code/start_services.sh
RUN chmod +x /code/start_services.sh
# Run .sh file

CMD ["/code/start_services.sh"]