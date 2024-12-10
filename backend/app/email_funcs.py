import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import ssl
import os
from .settings import email_settings

def send_email(email_to: str, summary_id: int):
    sender_email = os.environ.get("SENDER_EMAIL")
    password = os.environ.get("SENDER_PASSWORD")
    message = MIMEMultipart("alternative")
    message["Subject"] = "Brify record link"
    message["From"] = sender_email
    message["To"] = email_to
    #message = "Добрый день, ваша ссылка на транскрибированную запись встречи: (тут должна быть ссылка). Спасибо за использование нашего сервиса. Неизвестно почему не нравится это сообщение, но ладно. Напишем ещё текста. Вот ещё архивированная запись."
    text = """\
        Greetings, here is your link to the thing (link should be here). Thank you for using our service. 
        I don't know why this is need, but ok. More text more text"""
    html = """\
        <html>
            <body>
            <p>Greetings, here is your link to the thing http://127.0.0.1:5173/account/summary/""" + str(summary_id) + """ Thank you for using our service.</p>
            <p>I don't know why this is need, but ok. More text more text</p>
            </body>
        </html>
        """
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    message.attach(part1)
    message.attach(part2)
    context = ssl.create_default_context()
    with smtplib.SMTP("smtp.rambler.ru", 25) as server:
        server.starttls(context=context)
        server.login(sender_email, password)
        server.sendmail(sender_email, email_to, message.as_string())
