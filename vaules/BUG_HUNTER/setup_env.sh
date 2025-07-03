#!/bin/bash
# setup_env.sh
# Qué hace: Instala dependencias y configura el entorno.
# Cómo usarlo: chmod +x setup_env.sh && ./setup_env.sh

echo "Instalando dependencias..."
pip install -r requirements.txt

echo "Configurando entorno..."
# Agrega tus claves de API aquí (ejemplo: HackerOne)
# export HACKERONE_API_TOKEN="tu_token"

echo "¡Entorno listo! Usa ./Scripts/hunt.sh [program_name] para cazar."
