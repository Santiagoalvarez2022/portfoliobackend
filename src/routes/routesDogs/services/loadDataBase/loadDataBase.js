const createBreeds  = require("./createRegisterBreeds");
const getImagesForBreed = require("./getImagesForBreed");
const organizedApiList = require("./organizeApiList");
const allDogsApi = require("./allDogsApi.json");
const thedogapi = require("./allDogsApi.json");


const loadDataBase = async () =>{
    // const dogsList = await organizedApiList();//obtengo todas las razas con la informacion ordenda y filtrasda
    // const breeds = await getImagesForBreed(dogsList);//agrego a cada raza una foto representativa
    // return breeds;
    
   
    
}
//obtener data de la api para crear el json
// loadDataBase()s


module.exports=loadDataBase;
