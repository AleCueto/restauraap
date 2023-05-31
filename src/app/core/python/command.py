import os
import pandas as pd
import matplotlib.pyplot as plt
import shutil

# Obtener la ruta completa del archivo "datos.json"
ruta_datos = os.path.join(os.path.dirname(__file__), 'datos.json')

# Crear el directorio 'graficos'
os.makedirs('graficos', exist_ok=True)

# Cargar el JSON en un DataFrame de Pandas
df = pd.read_json(ruta_datos)

# Total de ventas
total_ventas = df['totalPrice'].sum()

# Obtener el conteo de platos
conteo_platos = df['dishesList'].explode().apply(lambda dish: dish['name']).value_counts()

# Obtener el nombre de cada comanda y sus platos
nombres_comandas = df['title']
platos_por_comanda = df['dishesList'].apply(lambda dishes: ', '.join([dish['name'] for dish in dishes]))

# Cantidad de comandas y cantidad de platos totales
cantidad_comandas = df.shape[0]
cantidad_platos_totales = df['dishesList'].explode().shape[0]

# Cantidad de platos por comanda
cantidad_platos_por_comanda = df['dishesList'].apply(lambda dishes: len(dishes))

# Crear un gráfico de barras para el total de comandos por restaurante
comandos_por_restaurante = df['idRestaurant'].value_counts()
comandos_por_restaurante.plot(kind='bar', rot=0)
plt.xlabel('ID de Restaurante')
plt.ylabel('Cantidad de Comandos')
plt.title('Total de Comandos por Restaurante')
plt.savefig('graficos/grafico_comandos_restaurante.png')  # Guardar la imagen del gráfico en el directorio 'graficos'

# Crear un histograma de los precios de los platos
plt.hist(df['dishesList'].explode().apply(lambda dish: dish['price']), bins=10)
plt.xlabel('Precio')
plt.ylabel('Frecuencia')
plt.title('Distribución de Precios de los Platos')
plt.savefig('graficos/histograma_precios_platos.png')  # Guardar la imagen del histograma en el directorio 'graficos'

# Exportar los datos de las comandas a un archivo CSV
df.to_csv('comandas.csv', index=False)

# Crear un DataFrame con la información del reporte
reporte = pd.DataFrame({
    'Total de Ventas': total_ventas,
    'Cantidad de Comandas': cantidad_comandas,
    'Cantidad de Platos Totales': cantidad_platos_totales,
    'Platos Repetidos': conteo_platos,
    'Nombres de Comandas': nombres_comandas,
    'Platos por Comanda': platos_por_comanda,
    'Cantidad de Platos por Comanda': cantidad_platos_por_comanda
    # Agrega más columnas según tus necesidades
})

# Exportar el reporte a un archivo CSV
reporte.to_csv('reporte.csv', index=False)

# Comprimir los gráficos en un archivo ZIP
shutil.make_archive('graficos', 'zip', 'graficos')

# Cambiar el nombre del archivo ZIP
shutil.move('graficos.zip', 'graficos_reporte.zip')

# Crear un enlace de descarga
enlace_descarga = f'<a href="graficos_reporte.zip" download>Descargar Reporte</a>'
print(enlace_descarga)
