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
  pokemon1 = requests.get("http://pokeapi.co/api/v1/pokemon/"+str(math.floor(random.random()*100)))
  pokemon2 = requests.get("http://pokeapi.co/api/v1/pokemon/"+str(math.floor(random.random()*100)))
  pokemon1 = json.loads(pokemon1.text)
  pokemon2 = json.loads(pokemon2.text)
  # moves api call
  moves1first = requests.get("http://pokeapi.co/"+pokemon1['moves'][1]['resource_uri'])
  moves2first = requests.get("http://pokeapi.co/"+pokemon2['moves'][1]['resource_uri'])
  moves1first = json.loads(moves1first.text)
  moves2first = json.loads(moves2first.text)

  moves1second = requests.get("http://pokeapi.co/"+pokemon1['moves'][2]['resource_uri'])
  moves2second = requests.get("http://pokeapi.co/"+pokemon2['moves'][2]['resource_uri'])
  moves1second = json.loads(moves1second.text)
  moves2second = json.loads(moves2second.text)

  pokedex = {
    'firstPokemon':{
    'name': pokemon1['name'],
    'id': pokemon1['pkdx_id'],
    'hp': pokemon1['hp'],
    'atk': pokemon1['sp_atk'],
    'def': pokemon1['sp_def'],
    'moves':{
      'move1': moves1first['name'],
      'move1_power': moves1first['power'],
      'move2': moves1second['name'],
      'move2_power': moves1second['power']
    }



    },
    'secondPokemon':{
    'name': pokemon2['name'],
    'id': pokemon2['pkdx_id'],
    'hp': pokemon2['hp'],
    'atk': pokemon2['sp_atk'],
    'def': pokemon2['sp_def'],
    'moves':{
      'move1': moves2first['name'],
      'move1_power': moves2first['power'],
      'move2': moves2second['name'],
      'move2_power': moves2second['power']
    }



    }

  }
  # return json.dumps(moves2)
  return json.dumps(pokedex)

app.run(debug=True)


