import os
import pandas as pd
import matplotlib.pyplot as plt
import shutil

# Create the 'graficos' directory
os.makedirs('graficos', exist_ok=True)

# Cargar el JSON en un DataFrame de Pandas
df = pd.read_json('datos.json')

# Total de ventas
total_ventas = df['totalPrice'].sum()

# Promedio de precio por plato
promedio_precio = df['dishesList'].apply(lambda dishes: sum([dish['price'] for dish in dishes]) / len(dishes)).mean()

# Platos más populares
platos_populares = df['dishesList'].explode().apply(lambda dish: tuple(dish.items())).value_counts().nlargest(5)

# Total de comandos por restaurante
comandos_por_restaurante = df['idRestaurant'].value_counts()

# Análisis de precios
analisis_precios = df['dishesList'].apply(lambda dishes: pd.Series([dish['price'] for dish in dishes]).describe())

# Crear un gráfico de barras para el total de comandos por restaurante
comandos_por_restaurante.plot(kind='bar', rot=0)
plt.xlabel('ID de Restaurante')
plt.ylabel('Cantidad de Comandos')
plt.title('Total de Comandos por Restaurante')
plt.savefig('graficos/grafico_comandos_restaurante.png')  # Save the graph image inside the 'graficos' directory

# Crear un histograma de los precios de los platos
plt.hist(df['dishesList'].explode().apply(lambda dish: dish['price']), bins=10)
plt.xlabel('Precio')
plt.ylabel('Frecuencia')
plt.title('Distribución de Precios de los Platos')
plt.savefig('graficos/histograma_precios_platos.png')  # Save the histogram image inside the 'graficos' directory

# Guardar el reporte en un archivo CSV
reporte = pd.DataFrame({
    'Total de Ventas': [total_ventas],
    'Promedio de Precio por Plato': [promedio_precio]
})
reporte.to_csv('reporte.csv', index=False)

# Comprimir los gráficos en un archivo zip
shutil.make_archive('graficos', 'zip', 'graficos')

# Cambiar el nombre del archivo zip
shutil.move('graficos.zip', 'graficos_reporte.zip')

# Crear un enlace de descarga
enlace_descarga = f'<a href="graficos_reporte.zip" download>Descargar Reporte</a>'
print(enlace_descarga)
