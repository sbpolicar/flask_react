import json
import requests
import random
import math
import os
from flask import Flask, request, flash, url_for, redirect

app = Flask(__name__)

@app.route('/')
def index():
  return app.send_static_file('index.html')

@app.route('/api/pokedex')
def pokedex():
  # pokemon api call
  url1 = "http://pokeapi.co/api/v1/pokemon/"+str(int(math.floor(random.random()*150)))
  pokemon1 = requests.get(url1)
  print(url1)
  print('call 1: {}'.format(pokemon1))
  url2 = "http://pokeapi.co/api/v1/pokemon/"+str(int(math.floor(random.random()*150)))
  pokemon2 = requests.get(url2)
  print(url2)
  print('call 2: {}'.format(pokemon2))
  pokemon1 = json.loads(pokemon1.text)
  pokemon2 = json.loads(pokemon2.text)
  # moves api call
  moves1first = requests.get("http://pokeapi.co/"+pokemon1['moves'][1]['resource_uri'])
  print('call 3: {}'.format(moves1first))
  moves2first = requests.get("http://pokeapi.co/"+pokemon2['moves'][1]['resource_uri'])
  print('call 4: {}'.format(moves2first))
  moves1first = json.loads(moves1first.text)
  moves2first = json.loads(moves2first.text)

  moves1second = requests.get("http://pokeapi.co/"+pokemon1['moves'][2]['resource_uri'])
  print('call 5: {}'.format(moves1second))
  moves2second = requests.get("http://pokeapi.co/"+pokemon2['moves'][2]['resource_uri'])
  print('call 6: {}'.format(moves2second))
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

@app.route('/<path:path>')
def static_path(path):
  return app.send_static_file(path)

# app.run(debug=True)
if __name__ == "__main__":
  port = int(os.environ.get("PORT", 5000))
  app.run(host='0.0.0.0', port=port)


