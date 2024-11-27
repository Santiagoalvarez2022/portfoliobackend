const {Dog} = require("../../../../db");



const createBreeds = async(breeds) =>{

    try {
        const breedsRegistred = await Dog.bulkCreate([breeds])
        return breedsRegistred;
    } catch (error) {
        return {error:error.message}
    }

};

module.exports = createBreeds;