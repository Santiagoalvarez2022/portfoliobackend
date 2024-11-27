const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue : DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    alturaMax: {
      type: DataTypes.STRING,
      allowNull :false,
      defaultValue : ""
      
    },
    alturaMin: {
      type: DataTypes.STRING,
      allowNull :false,
      defaultValue : ""

    },

    pesoMax: {
      type: DataTypes.STRING,
      allowNull :false,
      defaultValue : ""

    },
    pesoMin: { 
      type: DataTypes.STRING,
      allowNull :false,
      defaultValue : ""

    },
 
    vidaMax: {
      type: DataTypes.STRING,
      allowNull :false,
      defaultValue : ""

    },
    vidaMin: {
      type: DataTypes.STRING,
      allowNull :false, 
      defaultValue : ""

    },

    image : {
      type : DataTypes.STRING,
    },
    temperaments : {
      type : DataTypes.STRING,
    },
    type : {
      type : DataTypes.STRING,
    },
  },
  {timestamps: false}//elimina las propiedades de fecha de creacion y de modificacion
  );
};

