import os
import pandas as pd
import json
from collections import OrderedDict

# Obtener la ruta completa del archivo "datos.json"
ruta_datos = os.path.join(os.path.dirname(__file__), '')
ruta_datos_json = os.path.join(ruta_datos, 'datos.json')
ruta_datos_csv = os.path.join(ruta_datos, 'dishes.csv')

# Cargar el JSON en una lista de comandas con OrderedDict
with open(ruta_datos_json) as file:
    data = json.load(file, object_pairs_hook=OrderedDict)

# Crear una lista para almacenar los datos de los platos
platos_data = []

# Iterar sobre las comandas y extraer los datos de los platos
for comanda in data:
    titulo = comanda.get("title")
    descripcion = comanda.get("description")
    for plato in comanda.get("dishesList", []):
        plato_data = {
            "command": titulo,
            "description": descripcion
        }
        for key, value in plato.items():
            if key != "idRestaurant" and key != "image":
                plato_data[key] = f'{str(value).replace(".", ",")}' if pd.notnull(value) else ""
        platos_data.append(plato_data)

# Crear DataFrame para los platos
platos_df = pd.DataFrame(platos_data)

# Guardar el DataFrame en el archivo CSV
platos_df.to_csv(ruta_datos_csv, index=False, encoding='utf-8')

print("Archivo CSV creado con éxito.")
