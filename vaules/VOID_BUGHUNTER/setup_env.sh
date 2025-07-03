#!/bin/bash
# setup_env.sh
# Objetivo: Configura el entorno para VOID_HUNTER (instala dependencias, configura variables).
# Uso: chmod +x setup_env.sh && ./setup_env.sh

echo "Instalando dependencias de Python..."
pip install -r requirements.txt

echo "Configurando variables de entorno..."
# Ejemplo: export HACKERONE_API_TOKEN="your_token"
# Añade tus claves de API para HackerOne, Bugcrowd, Intigriti aquí

echo "Entorno configurado. Ejecuta ./quantum_orchestrator.sh para comenzar."
