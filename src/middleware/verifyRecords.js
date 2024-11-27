const {Dog} = require("../db");
const get_allDogsBD = require("../../utils/get_allDogsDB");
const jSON_allDogs = require("../routes/routesDogs/services/loadDataBase/allDogsApi.json")

const verifyDogRecords = async (req, res, next) => {
    try {
        //verifico si hay algo en la BD
        let records = await get_allDogsBD()
        if (!records.length && jSON_allDogs.length) {
            //SI NO HAY NADA, CARGO EL .JSON
            await Dog.bulkCreate(jSON_allDogs);
        }
        next();
        // } else  {
        //   //SI NO ESTA EL .JSON CREARLO
        // }
    } catch (error) {
      // Manejo de errores
      console.error('Error en el middleware verifyDogRecords:', error);
      res.status(400).json({ error: 'Error en el middleware verifyDogRecords' });
    }
  };
  
  module.exports = verifyDogRecords;