//INDEX DE TODOS LOS CONTROLLERS, ACA CONVERGEN TODAS LAS FUNCIONES EN UN OBJETO QUE EXPORTO


const get_data_api= require('../routes/routesDogs/services/loadDataBase/get_data_api')
const post_dog = require('./dogs/bd/post_dog')
const get_allForName = require('./dogs/bd/get_allForName')
const get_by_Id = require('./dogs/bd/get_by_Id')
const get_temperaments = require('./temperaments/get_temperaments')

module.exports = {
    get_data_api,
    post_dog,
    get_allForName,
    get_by_Id,
    get_temperaments
};
