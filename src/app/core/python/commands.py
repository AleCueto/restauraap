import os
import pandas as pd
import json
from collections import OrderedDict

# Obtener la ruta completa del archivo "datos.json"
ruta_datos = os.path.join(os.path.dirname(__file__), '')
ruta_datos_json = os.path.join(ruta_datos, 'datos.json')
ruta_datos_csv = os.path.join(ruta_datos, 'commands.csv')

# Cargar el JSON en una lista de comandas con OrderedDict
with open(ruta_datos_json) as file:
    data = json.load(file, object_pairs_hook=OrderedDict)

# Crear lista para almacenar los datos de las comandas
comandas_data = []

# Iterar sobre las comandas y extraer los datos
for comanda in data:
    comanda_data = {}
    for key, value in comanda.items():
        if key != "dishesList" and key != "idRestaurant":
            comanda_data[key] = f'{str(value).replace(".", ",")}' if isinstance(value, (int, float)) else str(value)
    
    # Agregar los datos de la comanda a la lista de comandas
    comandas_data.append(comanda_data)

# Crear DataFrame para las comandas
comandas_df = pd.DataFrame(comandas_data)

# Guardar el DataFrame en el archivo CSV
comandas_df.to_csv(ruta_datos_csv, index=False)

print("Archivo CSV de comandas creado con éxito.")
