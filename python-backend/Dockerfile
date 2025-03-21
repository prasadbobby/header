FROM python:3.9-slim

WORKDIR /app

# Install critical dependencies first in the correct order
RUN pip install --no-cache-dir markupsafe==2.0.1
RUN pip install --no-cache-dir werkzeug==1.0.1
RUN pip install --no-cache-dir jinja2==3.0.3
RUN pip install --no-cache-dir itsdangerous==2.0.1
RUN pip install --no-cache-dir flask==1.1.4
RUN pip install --no-cache-dir google-generativeai==0.3.1

# Copy requirements and install remaining dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Environment variable for the port
ENV PORT 8080

# Run the app with the specified port
CMD exec gunicorn --bind :$PORT app:app