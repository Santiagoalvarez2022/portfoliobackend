const  axios  = require("axios");
require("dotenv").config
const{API_KEY} =process.env 
const loadDataBase = require("./loadDataBase");


//MODULARIZO EN UNA FUNCION LA PETICION A LA API y FILTRADO DE LAS PROPIEDADES NECESARIAS, PARA NO REPETIR CODIGO EN LOS CONTROLLERS

const get_data_api = async () => {
  const result = await loadDataBase();
  return result
}



    
module.exports = get_data_api;