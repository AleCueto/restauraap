import os
import pandas as pd
import json
from collections import OrderedDict

# Obtener la ruta completa del archivo "datos.json"
ruta_datos = os.path.join(os.path.dirname(__file__), '')
ruta_datos_json = os.path.join(ruta_datos, 'datos.json')
ruta_datos_csv = os.path.join(ruta_datos, 'datos.csv')

# Cargar el JSON en una lista de comandas con OrderedDict
with open(ruta_datos_json) as file:
    data = json.load(file, object_pairs_hook=OrderedDict)

# Crear listas para almacenar los datos de las comandas y los platos
comandas_data = []
platos_data = []

# Iterar sobre las comandas y extraer los datos
for comanda in data:
    comanda_data = {}
    platos = comanda.get("dishesList", [])
    for key, value in comanda.items():
        if key != "dishesList":
            comanda_data[key] = str(value)
    
    # Agregar los datos de la comanda a la lista de comandas
    comandas_data.append(comanda_data)

    # Agregar los datos de los platos a la lista de platos
    for index, plato in enumerate(platos, start=1):
        plato_data = {
            "Comanda": comanda_data["title"],
            "Index": index,
            "Name": plato.get("name", ""),
            "IdDish": plato.get("id", ""),
            "IdRestaurant": plato.get("idRestaurant", ""),
            "Price": plato.get("price", ""),
            "Count": plato.get("count", "")
        }
        platos_data.append(plato_data)

# Crear DataFrames para las comandas y los platos
comandas_df = pd.DataFrame(comandas_data)
platos_df = pd.DataFrame(platos_data)

# Guardar los DataFrames en el archivo CSV
comandas_df.to_csv(ruta_datos_csv, index=False)
platos_df.to_csv(ruta_datos_csv, mode='a', index=False, header=False)

print("Archivo CSV creado con éxito.")
