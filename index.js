#!/usr/bin/env node
const axios = require('axios');
var fs = require('fs');

console.log("Requisitando municípios...");
axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
.then((r) => {
  console.log("Municípios requisitados com sucesso!");
  const cities = r.data.map(city => ({
    name: city.nome,
    state: city.microrregiao.mesorregiao.UF.nome,
  }))
  fs.writeFile('cities.json', JSON.stringify(cities), 'utf8',
    error => {
      if(error) {
        console.error(error);
      } else {
        console.log("cities.json escrito com sucesso!");
      }
    }
  );
});

console.log("Requisitando estados...");
axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
.then((r) => {
  console.log("Estados requisitados com sucesso!");
  const states = r.data.map(state => ({
    name: state.nome,
    UF: state.sigla,
  }))
  fs.writeFile('states.json', JSON.stringify(states), 'utf8',
    error => {
      if(error) {
        console.error(error);
      } else {
        console.log("states.json escrito com sucesso!");
      }
    }
  );
});