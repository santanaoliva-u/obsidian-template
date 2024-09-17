# 01 - Presupuestos
# Análisis del Valor Presente Neto (VPN)

El **Valor Presente Neto (VPN)** es una herramienta financiera que permite evaluar la viabilidad de un proyecto de inversión. Se basa en calcular el valor presente de los flujos de caja futuros descontados por una tasa de interés. La fórmula general es:

$VPN = \sum_{t=1}^{n} \frac{CF_t}{(1+r)^t} - C_0$ 


Donde:

- $CF_t$ es el flujo de caja en el periodo $t$.
- $r$ es la tasa de descuento (también conocida como tasa de interés o tasa de oportunidad).
- $t$ es el periodo de tiempo.
- $n$ es el número total de periodos.
- $C_0$ es la inversión inicial.

## Ejemplo Práctico

Supongamos que tienes la siguiente serie de flujos de caja para un proyecto de inversión:

- Inversión inicial $C_0 = \$10,000$
- Flujos de caja:
  - Año 1: $CF_1 = \$3,000$
  - Año 2: $CF_2 = \$4,000$
  - Año 3: $CF_3 = \$5,000$
- La tasa de descuento es del $10\%$, es decir, $r = 0.10$.

El VPN se calcula como:

$VPN = \frac{3,000}{(1 + 0.10)^1} + \frac{4,000}{(1 + 0.10)^2} + \frac{5,000}{(1 + 0.10)^3} - 10,000$

Realizando los cálculos:

$VPN = \frac{3,000}{1.10} + \frac{4,000}{(1.10)^2} + \frac{5,000}{(1.10)^3} - 10,000$

$VPN = 2,727.27 + 3,305.79 + 3,757.37 - 10,000$

$VPN = -209.57$

## Interpretación

El VPN negativo indica que el proyecto generaría una pérdida de \$209.57 si se invierte en él, utilizando una tasa de descuento del 10%. Por lo tanto, el proyecto no es rentable bajo las condiciones actuales.

Si el VPN fuera positivo, indicaría que el proyecto es rentable y generaría valor para el inversionista.

## Conclusiones

El análisis del Valor Presente Neto permite evaluar si un proyecto de inversión generará más valor que el costo del capital invertido. En este caso, un VPN negativo indica que el proyecto no es viable, pero se podrían probar diferentes tasas de descuento o ajustar los flujos de caja esperados para obtener mejores resultados.

Creador: @santanaoliva_u
