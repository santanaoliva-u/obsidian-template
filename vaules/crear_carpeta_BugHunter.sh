#!/bin/bash

# setup_bug_hunter.sh
# Qué hace: Crea la estructura de BUG_HUNTER para Bug Bounty en tu directorio actual.
# Cómo usarlo:
# 1. Guarda este script como setup_bug_hunter.sh
# 2. Dale permisos: chmod +x setup_bug_hunter.sh
# 3. Ejecútalo: ./setup_bug_hunter.sh

# Colores para mensajes en terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # Sin color

# Nombre de la carpeta principal
ROOT_DIR="BUG_HUNTER"

# Verifica si la carpeta ya existe
if [ -d "$ROOT_DIR" ]; then
    echo -e "${RED}Error: La carpeta $ROOT_DIR ya existe. Borra con 'rm -rf $ROOT_DIR' y reintenta.${NC}"
    exit 1
fi

echo -e "${GREEN}Creando BUG_HUNTER... ¡Listo para cazar bugs!${NC}"

# Crea la carpeta principal y entra
mkdir -p "$ROOT_DIR"
cd "$ROOT_DIR" || exit

# Crea README.md (explicación del proyecto)
cat << 'EOF' > README.md
# 🏴‍☠️ BUG_HUNTER: Tu Base para Cazar Bugs

BUG_HUNTER es un sistema limpio y práctico para hackers de Bug Bounty. Organiza tu recon, pruebas y reportes para [[HackerOne]], [[Bugcrowd]], e [[Intigriti]]. Automatiza lo aburrido y enfócate en encontrar bugs que paguen.

## Carpetas
- [[Plan/]] - Guías y plantillas para planificar y reportar.
- [[Resources/]] - Listas de palabras, payloads y herramientas.
- [[Programs/]] - Carpetas por programa (ejemplo: [[Programs/target_h1]]).
- [[Scripts/]] - Scripts para escanear, probar y reportar.
- [[Trackers/]] - Seguimiento de bugs y ganancias.
- [[Threats/]] - Monitoreo de CVEs y leaks para atacar primero.

## Cómo empezar
1. Instala dependencias: `pip install -r requirements.txt`
2. Configura el entorno: `./setup_env.sh`
3. Crea un programa: Copia [[Plan/Templates/New_Program.md]] a [[Programs/nombre_programa]].
4. Automatiza: `./Scripts/hunt.sh [program_name]`

## Filosofía
"Encuentra bugs rápido, reporta como pro, cobra como rey."
EOF

# Crea CHANGELOG.md (registro de cambios)
cat << 'EOF' > CHANGELOG.md
# Registro de Cambios

## [1.0.0] - 2025-07-03
- Creada la estructura inicial de BUG_HUNTER.
- Añadidas plantillas y scripts para Bug Bounty.
- Optimizado para HackerOne, Bugcrowd e Intigriti.
EOF

# Crea requirements.txt (dependencias de Python)
cat << 'EOF' > requirements.txt
requests==2.31.0
beautifulsoup4==4.12.2
PyYAML==6.0.1
# Agrega más dependencias según los scripts
EOF

# Crea setup_env.sh (configura el entorno)
cat << 'EOF' > setup_env.sh
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
EOF
chmod +x setup_env.sh

# Crea Plan/
mkdir -p Plan/Templates
cat << 'EOF' > Plan/How_To_Hunt.md
# Cómo Cazar Bugs
# Qué es: Guía rápida para encontrar bugs.
# Pasos:
- Recon: Busca dominios, subdominios y APIs.
- Pruebas: Usa payloads de [[Resources/Payloads/]].
- Reportes: Sigue [[Plan/Templates/Bug_Report.md]].
EOF
cat << 'EOF' > Plan/Platform_Rules.md
# Reglas de Plataformas
# Qué es: Reglas para no meterte en problemas en [[HackerOne]], [[Bugcrowd]], [[Intigriti]].
# Ejemplo: Qué dominios puedes probar, qué está prohibido.
EOF
cat << 'EOF' > Plan/Templates/New_Program.md
# Nuevo Programa
# Qué es: Plantilla para iniciar un programa.
# Cómo usarlo: Copia a [[Programs/nombre_programa]] y completa.

## Programa: [Nombre]
- Plataforma: [[HackerOne]] / [[Bugcrowd]] / [[Intigriti]]
- Dominios: [Ej. example.com]
- Recompensas: [Ej. $100-$5000]
- Fechas: [Inicio/Fin]
- Objetivo: [Ej. XSS, SSRF, RCE]
EOF
cat << 'EOF' > Plan/Templates/Bug_Report.md
# Reporte de Bug
# Qué es: Plantilla para reportar bugs.
# Cómo usarlo: Copia a [[Programs/nombre_programa/Bugs/]].

## Bug ID: [ID]
- Programa: [[nombre_programa]]
- Tipo: [Ej. XSS, SSRF]
- Severidad: [Baja/Media/Alta/Crítica]
- Pasos: [Cómo reproducirlo]
- Impacto: [Qué puede hacer un atacante]
- Solución: [Cómo arreglarlo]
EOF

# Crea Resources/
mkdir -p Resources/Lists Resources/Payloads
cat << 'EOF' > Resources/Lists/subdomains.txt
# Lista de Subdominios
# Qué es: Palabras para encontrar subdominios.
# Ejemplo: admin, api, dev
EOF
cat << 'EOF' > Resources/Lists/api_paths.txt
# Lista de Rutas de APIs
# Qué es: Rutas para buscar endpoints de APIs.
# Ejemplo: /api/v1/users, /graphql
EOF
cat << 'EOF' > Resources/Payloads/xss.txt
# Payloads XSS
# Qué es: Códigos para probar XSS.
# Ejemplo: <script>alert('test')</script>
EOF
cat << 'EOF' > Resources/Payloads/ssrf.txt
# Payloads SSRF
# Qué es: Códigos para probar SSRF en APIs o cloud.
# Ejemplo: http://localhost
EOF
cat << 'EOF' > Resources/Payloads/idor.txt
# Payloads IDOR
# Qué es: Códigos para probar accesos no autorizados.
# Ejemplo: id=1, id=2
EOF

# Crea Programs/ (con ejemplo)
mkdir -p Programs/target_h1/Recon Programs/target_h1/Bugs Programs/target_h1/Reports
cat << 'EOF' > Programs/target_h1/Program_Details.md
# Detalles del Programa
# Qué es: Resumen del programa (copia [[Plan/Templates/New_Program.md]]).
EOF
cat << 'EOF' > Programs/target_h1/Recon/domains.md
# Dominios Encontrados
# Qué es: Lista de dominios y subdominios.
# Ejemplo: sub.example.com
EOF
cat << 'EOF' > Programs/target_h1/Recon/endpoints.md
# Endpoints Encontrados
# Qué es: Rutas de APIs y páginas.
# Ejemplo: /api/v1/users
EOF
cat << 'EOF' > Programs/target_h1/Bugs/bug_001.md
# Bug 001
# Qué es: Ejemplo de bug (copia [[Plan/Templates/Bug_Report.md]]).
EOF
cat << 'EOF' > Programs/target_h1/Reports/final_report.md
# Reporte Final
# Qué es: Reporte para enviar a la plataforma (copia [[Plan/Templates/Bug_Report.md]]).
EOF

# Crea Scripts/
mkdir -p Scripts
cat << 'EOF' > Scripts/hunt.sh
#!/bin/bash
# hunt.sh
# Qué hace: Corre el flujo completo: recon, pruebas y reportes.
# Cómo usarlo: ./hunt.sh [program_name]
# Ejemplo: ./hunt.sh target_h1

echo "Cazando bugs para $1..."
# Llama a scan_domains.py, test_bugs.py, make_report.py
# Prompt: "Crea un script Bash que integre recon, pruebas y reportes para Bug Bounty."
EOF
cat << 'EOF' > Scripts/scan_domains.py
# scan_domains.py
# Qué hace: Encuentra dominios y subdominios, guarda en [[Programs/nombre_programa/Recon/]].
# Cómo usarlo: python3 scan_domains.py [dominio]
# Ejemplo: python3 scan_domains.py example.com
# Prompt: "Crea un script Python que escanee subdominios y genere un reporte en .md."

import requests
# [Cuerpo del script generado por IA]
EOF
cat << 'EOF' > Scripts/test_bugs.py
# test_bugs.py
# Qué hace: Prueba XSS, SSRF, IDOR usando [[Resources/Payloads/]].
# Cómo usarlo: python3 test_bugs.py [url]
# Ejemplo: python3 test_bugs.py https://example.com
# Prompt: "Crea un script Python que pruebe vulnerabilidades (XSS, SSRF, IDOR) y genere PoCs en .md."

import requests
# [Cuerpo del script generado por IA]
EOF
cat << 'EOF' > Scripts/make_report.py
# make_report.py
# Qué hace: Genera reportes para plataformas desde [[Programs/nombre_programa/Bugs/]].
# Cómo usarlo: python3 make_report.py [program_name]
# Ejemplo: python3 make_report.py target_h1
# Prompt: "Crea un script Python que genere reportes para HackerOne/Bugcrowd desde logs."

import json
# [Cuerpo del script generado por IA]
EOF
cat << 'EOF' > Scripts/api_scan.sh
#!/bin/bash
# api_scan.sh
# Qué hace: Busca endpoints de APIs en dominios.
# Cómo usarlo: ./api_scan.sh [dominios_file]
# Ejemplo: ./api_scan.sh domains.txt
# Prompt: "Crea un script Bash que extraiga endpoints de APIs desde JS/HTTP."

# [Cuerpo del script generado por IA]
EOF
cat << 'EOF' > Scripts/leak_check.sh
#!/bin/bash
# leak_check.sh
# Qué hace: Busca filtraciones en GitHub para un programa.
# Cómo usarlo: ./leak_check.sh [dominio]
# Ejemplo: ./leak_check.sh example.com
# Prompt: "Crea un script Bash que monitoree GitHub por leaks de un programa."

# [Cuerpo del script generado por IA]
EOF
cat << 'EOF' > Scripts/graphql_probe.py
# graphql_probe.py
# Qué hace: Escanea endpoints GraphQL para introspección y abusos.
# Cómo usarlo: python3 graphql_probe.py [url]
# Ejemplo: python3 graphql_probe.py https://example.com/graphql
# Prompt: "Crea un script Python que escanee GraphQL y detecte vulnerabilidades."

import requests
# [Cuerpo del script generado por IA]
EOF
chmod +x Scripts/*.sh

# Crea Trackers/
mkdir -p Trackers
cat << 'EOF' > Trackers/Bug_Tracker.md
# Seguimiento de Bugs
# Qué es: Lista de bugs encontrados, su estado y severidad.
# Ejemplo: Bug_001 - XSS - Alta - Enviado
EOF
cat << 'EOF' > Trackers/Money_Tracker.md
# Seguimiento de Ganancias
# Qué es: Registro de pagos recibidos.
# Ejemplo: HackerOne - $1000 - 2025-07-03
EOF

# Crea Threats/
mkdir -p Threats
cat << 'EOF' > Threats/New_CVEs.md
# Nuevos CVEs
# Qué es: Lista de CVEs frescos para priorizar.
# Ejemplo: CVE-2025-XXXX - [[HackerOne]]
EOF
cat << 'EOF' > Threats/Leaks.md
# Filtraciones
# Qué es: Datos filtrados en GitHub/Dark Web.
# Cómo usarlo: Usa [[Scripts/leak_check.sh]].
EOF

# Mensaje final
echo -e "${GREEN}¡BUG_HUNTER creado con éxito!${NC}"
echo -e "Qué hacer ahora:"
echo -e "1. Configura el entorno:"
echo -e "   cd BUG_HUNTER"
echo -e "   chmod +x setup_env.sh"
echo -e "   ./setup_env.sh"
echo -e "2. Crea un programa nuevo:"
echo -e "   cp -r Programs/target_h1 Programs/nombre_nuevo"
echo -e "   Edita Programs/nombre_nuevo/Program_Details.md"
echo -e "3. Automatiza:"
echo -e "   ./Scripts/hunt.sh nombre_nuevo"
echo -e "4. Completa los scripts en [[Scripts/]] con una IA o manualmente."