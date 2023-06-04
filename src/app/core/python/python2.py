import csv

# Datos a escribir en el archivo CSV
datos = [
    ["Field", "Value"],
    ["title", "Cueto comanda"],
    ["idTable", "TD3mdnfQnMVR559W7uvP"],
    ["totalPrice", "28.5"],
    ["idRestaurant", "QbIroJ72ubdMxejXukE35YEPZYg1"],
    ["id", "m8D71ldGnmYrSOZaHPqU"],
    ["dishesList"],
    ["", "name", "id", "idRestaurant", "price"],
    ["", "Salad", "24AVwMroezilsxunKAOP", "VUtQZA2p5QZElnlLJbvx6C2FgIx2", "4"],
    ["", "Kiwi", "7rf8sGlsUDpSffSXLBen", "VUtQZA2p5QZElnlLJbvx6C2FgIx2", "12.25"],
    ["", "Kiwi", "7rf8sGlsUDpSffSXLBen", "VUtQZA2p5QZElnlLJbvx6C2FgIx2", "12.25"]
]

# Ruta del archivo CSV
ruta_csv = 'datos.csv'

# Escribir los datos en el archivo CSV
with open(ruta_csv, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(datos)

print("Archivo CSV creado con éxito.")
