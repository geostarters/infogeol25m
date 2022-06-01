import json
import re

with open('C:/Users/al_l.struth/Documents/GEOSTART/info-geologica/src/Utils/infogeo1.json') as f:
    data = json.load(f, parse_int=str) # convertir int->strings

for item in data:
    if item["source-layer"] == "Unitats geològiques del basament":   # capa poligons basament
        item['filter'][1] = item['filter'][1].replace('_symbol', 'CODI_CAS')
        id_json = item["id"] 
        pattern = "Unitats geològiques del basament/(.*?)/" # agafa la nomenclatura com per exemple NNmc
        substring = re.search(pattern, id_json).group(1)
        filter_json = item["filter"][2]
        item['filter'][2] = item['filter'][2].replace(filter_json,substring)


#save data
with open('new_data.json', 'w') as f:  # nou arxiu amb nou estil
    json.dump(data, f)