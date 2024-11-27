const { default: axios } = require("axios");


function stopExecution() {
    console.log('Inicio de la ejecución');
  
    // Pausar la ejecución durante 3 segundos (3000 milisegundos)
    setTimeout(function() {
      console.log('Fin de la pausa. Continuando la ejecución');
      // Aquí puedes colocar el código que quieres ejecutar después de la pausa
    }, 60000);
  }
  
  

const getImage = async(reference_image_id) =>{
 
    const {data} = await axios(`https://api.thedogapi.com/v1/images/${reference_image_id}`)
    const {url} = data
    return url;
}

//funcion que pide las fotos por partes  35 y despues 136 
const requestByParts = async (start=0,finish=35,list,mensaje) =>{
     //como existe un limite en peticiones por minuto en Thedogsapi lo que hacemos es parcelar las peticiones 

    const dogs = [];
    for (let index = start; index < finish; index++) {
        const breed = list[index];
        const id_image = breed.reference_image_id;
        const image = await getImage(id_image);
        dogs.push({...breed,image})
    }

    console.log(mensaje);
    return dogs;

}



const getImagesForBreed = async (list) =>{
    //creamos un flag para que se envien la info solo cuando se terminen de obtener todas las imagens
    let flag = false; 
    //parte 1
    const dogs1 = await requestByParts(0,42,list,"1ra parte Lista");
    //pauso la ejecucion unos segundo para poder enviarle otras peticiones a la api
    stopExecution()
    stopExecution()
    
    //parte2
    const dogs2 = await requestByParts(42,84,list,"2da parte lista");
    stopExecution()
    stopExecution()
    
    const dogs3 = await requestByParts(84,126,list,"3ra parte lista");
    stopExecution()
    stopExecution()
    
    const dogs4 = await requestByParts(126,list.length,list,"4ta parte lista");



    return dogs1.concat(dogs2,dogs3,dogs4);
  
   
    
    //mientras flag sea false no avanzar 
    //usar un while 
}





module.exports = getImagesForBreed;



/*

const getImagesForBreed = async (list) =>{
    const dogs = [];
    //creamos un flag para que se envien la info solo cuando se terminen de obtener todas las imagens
    let flag = false; 
    //como existe un limite en peticiones por minuto en Thedogsapi lo que hacemos es parcelar las peticiones 
    for (let index = 0; index < 30; index++) {
        const breed = list[index];
        const id_image = breed.reference_image_id;
        const image = await getImage(id_image);
        dogs.push({...breed,image})
    }
    
    //mientras flag sea false no avanzar 
    while(!flag ){
        //itero la segunda parte
        for (let index = 30; index < 72; index++) {
            const breed = list[index];
            const id_image = breed.reference_image_id;
            const image = await getImage(id_image);
            dogs.push({...breed,image})
            index===71? flag= true : null
        }
    }

    if ( flag) return dogs
    else return {error:"algo fallo"}
    //usar un while 
}


*/