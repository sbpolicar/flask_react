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

@app.route('/pokedex')
def pokedex():
  pokemon1 = requests.get("http://pokeapi.co/api/v1/pokemon/"+str(math.floor(random.random()*100)))
  pokemon1moves = requests.get("http://pokeapi.co/api/v1/pokemon/"+str(math.floor(random.random()*100)))

  pokemon2 = requests.get("http://pokeapi.co/api/v1/pokemon/"+str(math.floor(random.random()*100)))
  pokedex = json.dumps({'pokemon1':json.loads(pokemon1.text),'pokemon2':json.loads(pokemon2.text)})
  return pokedex

app.run(debug=True)


