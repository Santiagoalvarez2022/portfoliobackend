const {Dog,Temperament} = require('../src/db');
//los controllers son funciones que realizan la logixa de las peticiones

const get_allDogsBD = async () =>{

 
    //TRAE DATOS DEL MODELO 
    let  dogs_db  = await Dog.findAll();
    


  //  dogs_db = dogs_db.map(dog =>{
  //    let temperaments = ""
     
  //    dog.temperaments.forEach(objTemps => {
  //      console.log("objtremps ", objTemps);
  //      if (Boolean(objTemps.name)) {
  //        temperaments = temperaments + " " +objTemps.name
  //      }

  //    });

  //    //depuro los datos
  //    let dog_ = dog.dataValues

  //    //cambio la propiedad temperaments por el string

  //    let dog__ = {
  //      ...dog_,
  //      temperaments:temperaments.trim(),
  //      type:"db"
  //    }

  //    return dog__

  //  })
   
   return dogs_db;

}


module.exports =get_allDogsBD;