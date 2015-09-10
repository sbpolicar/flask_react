import json
import requests
import random
import math
from flask import Flask, request, flash, url_for, redirect

app = Flask(__name__)

@app.route('/')
def index():
  return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_path(path):
  return app.send_static_file(path)

@app.route('/api/pokedex')
def pokedex():
  # pokemon api call
  pokemon1 = requests.get("https://pokeapi.co/api/v1/pokemon/"+str(math.floor(random.random()*150)))
  pokemon2 = requests.get("https://pokeapi.co/api/v1/pokemon/"+str(math.floor(random.random()*150)))
  pokemon1 = json.loads(pokemon1.text)
  pokemon2 = json.loads(pokemon2.text)
  # moves api call
  moves1first = requests.get("https://pokeapi.co/"+pokemon1['moves'][1]['resource_uri'])
  moves2first = requests.get("https://pokeapi.co/"+pokemon2['moves'][1]['resource_uri'])
  moves1first = json.loads(moves1first.text)
  moves2first = json.loads(moves2first.text)

  moves1second = requests.get("https://pokeapi.co/"+pokemon1['moves'][2]['resource_uri'])
  moves2second = requests.get("https://pokeapi.co/"+pokemon2['moves'][2]['resource_uri'])
  moves1second = json.loads(moves1second.text)
  moves2second = json.loads(moves2second.text)

  pokedex = {
    'firstPokemon':{
    'name': pokemon1['name'],
    'id': pokemon1['pkdx_id'],
    'hp': 100,
    'atk': pokemon1['sp_atk'],
    'def': pokemon1['sp_def'],
    'moves':[
      {'name':moves1first['name'], 'power':moves1first['power']},
      {'name':moves2first['name'], 'power':moves2first['power']}
    ]

    },
    'secondPokemon':{
    'name': pokemon2['name'],
    'id': pokemon2['pkdx_id'],
    'hp': 100,
    'atk': pokemon2['sp_atk'],
    'def': pokemon2['sp_def'],
    'moves':[
      {'name':moves1second['name'], 'power':moves1second['power']},
      {'name':moves2second['name'], 'power':moves2second['power']}
    ]




    }

  }
  # return json.dumps(moves2)
  return json.dumps(pokedex)

# app.run(debug=True)
if __name__ == "__main__":
  port = int(os.environ.get("PORT", 5000))
  app.run(host='0.0.0.0', port=port)


