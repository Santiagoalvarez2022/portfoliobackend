const {get_allForName} = require("../../controllers/index")
const get_allDogsBD = require("../../../utils/get_allDogsDB")


const handler_getDogs = async (req, res) =>{
    const {name} = req.query
    try {
            if(name){
                    //deve traer una lista de todos los perros que coincidan con ese nombre
                    const result = await get_allForName(name)
                    return res.status(200).json(result)    
            }
            else{
                //debo 
                    
                //traigo los dato de la db
                const result = await get_allDogsBD()
                //envio los datos 
                return res.status(200).json(result)
    
            }
            
    } catch (error) {
            res.status(400).json({error :error.message})
    }
}

module.exports = handler_getDogs