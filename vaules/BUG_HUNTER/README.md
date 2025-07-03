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
