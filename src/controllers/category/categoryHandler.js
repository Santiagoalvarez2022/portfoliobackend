const { getCategories, getProjectIncludesCat } = require("./categoryController")


/* handler para hacer una peticion de todas las categorias */
const getAllCategories = async function (req, res) {

    try {
        let result = await getCategories()
        
        res.status(201).json(result)
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}

const getProjectsByCategiries = async function (req, res) {
    try {
        await getProjectIncludesCat(req.query)
            /* Convertir objetos a cadenas JSON, formato: '{}' */
            .then(res => res.map(JSON.stringify))
            .then(res => new Set(res))
            /* Convertir cadenas de vuelta a objetos */
            .then(res => [...res].map(JSON.parse))
            .then(result => res.status(201).json(result))
    } catch (error) {
        res.status(406).json({ error: error.message })
    }
}


module.exports = {
    getAllCategories,
    getProjectsByCategiries
}