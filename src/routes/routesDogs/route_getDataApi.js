const express = require('express');
const router = express.Router()
const {handler_loadDogs, handler_getDogsApi,} = require('../../handlers/index')


///api/dogs/loadatabase carga los datos en la BD
router.get("/",handler_loadDogs);

//pide los datos a la api   api/dogs/loadatabase/thedogsapi
router.get("/thedogsapi", handler_getDogsApi);

module.exports = router
