FROM python:3.12-slim

#Set working directory in container
WORKDIR /code/app

#Copy the requirements file, into code folder
COPY ./requirements.txt /code/requirements.txt

#Install dependencies
RUN pip install --no-cache-dir -r /code/requirements.txt

COPY ./backend /code/app

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]