# Utiliser une image Python officielle
FROM python:3.11-alpine3.18

# Répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY app/ .
COPY .env.prod .env

# Copier init.sql dans /database
COPY database/init.sql /database/

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Commande pour démarrer l'application
CMD ["python", "bot.py"]