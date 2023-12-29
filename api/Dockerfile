FROM python:3.8

WORKDIR /api

COPY .. /api

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

ENV NAME World

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "api.wsgi:application"]