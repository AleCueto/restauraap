import os
import pandas as pd
import csv
import json
from collections import OrderedDict

# Obtener la ruta completa del archivo "datos.json"
ruta_datos = os.path.join(os.path.dirname(__file__), '')
ruta_datos_json = os.path.join(ruta_datos, 'datos.json')
ruta_datos_csv = os.path.join(ruta_datos, 'datos.csv')

# Cargar el JSON en una lista de comandas con OrderedDict
with open(ruta_datos_json) as file:
    data = json.load(file, object_pairs_hook=OrderedDict)

# Convertir las comandas en la estructura deseada
datos = []
for comanda in data:
    datos.append(["title", comanda.get("title", "")])
    datos.append([])
    datos[-1].extend(["Field", "Value"])
    for key, value in comanda.items():
        if key != "dishesList":
            datos.append([key, str(value)])

    # Agregar la lista de platos al final de la comanda
    if "dishesList" in comanda:
        datos.append([])
        datos[-1].extend(["Index", "Name", "IdDish", "IdRestaurant", "Price", "Count"])
        dish_count = {}
        for dish in comanda["dishesList"]:
            dish_id = dish.get("id", "")
            dish_count[dish_id] = dish_count.get(dish_id, 0) + 1
            if dish_count[dish_id] == 1:
                row = [str(dish_count[dish_id])] + [str(dish.get(key, "")) for key in ["name", "id", "idRestaurant", "price"]] + [str(dish_count[dish_id])]
                datos.append(row)
            else:
                for i in range(len(datos) - 1, 0, -1):
                    if datos[i][2] == dish_id:
                        datos[i][-1] = str(dish_count[dish_id])
                        break
        datos.append([])

# Escribir los datos en el archivo CSV
with open(ruta_datos_csv, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(datos)

print("Archivo CSV creado con éxito.")
