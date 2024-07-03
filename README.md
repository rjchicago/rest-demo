# REST Demo

## Methods

<https://en.wikipedia.org/wiki/HTTP#Request_methods>

* GET
* POST
* PUT
* PATCH
* DELETE
* HEAD
* OPTIONS
* TRACE

## Running

``` sh
docker compose build
docker compose up
```

## Watch

``` sh
while true; do clear; curl -s http://localhost:3001/apples/?sort=name | jq; sleep 2; done
```

## Usage

``` sh
# POST
curl -X POST -H "Content-Type: application/json" "http://localhost:3001/apples" -d '{"name":"Red Delicious", "colors": ["red"]}'
curl -X POST -H "Content-Type: application/json" "http://localhost:3001/apples" -d '{"name":"Granny Smith", "colors": ["green"]}'
curl -X POST -H "Content-Type: application/json" "http://localhost:3001/apples" -d '{"name":"Pink Lady", "colors": ["red","pink"]}'
curl -X POST -H "Content-Type: application/json" "http://localhost:3001/apples" -d '{"name":"Honey Crisp", "colors": ["yellow","red"]}'

# PUT
curl -X PUT -H "Content-Type: application/json" "http://localhost:3001/apples/Honey%20Crisp" -d '{"name": "Honeycrisp", "colors": ["yellow","red","green"]}'

# PATCH 
curl -X PATCH -H "Content-Type: application/json" "http://localhost:3001/apples/Honey%20Crisp" -d '{"flavors": ["sweet"]}'
curl -X PATCH -H "Content-Type: application/json" "http://localhost:3001/apples/Honey%20Crisp" -d '{"name": "Honeycrisp"}'

# DELETE
curl -X DELETE -H "Content-Type: application/json" "http://localhost:3001/apples/Honey%20Crisp"
```
