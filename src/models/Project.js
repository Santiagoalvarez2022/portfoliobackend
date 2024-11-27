const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('project', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        /* category: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false
        }, */
        summary: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        /* decha de formato YYYY-MM-DD */
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: Date.now() /* TODO FORMATEAR FECHA */
        },
        /* estado_proyecto: refiere a si aun está activo, en la parte de casos completado
        se mostrarian los proyectos con estado false (es decir, inactivos, porque se completaron) */
        project_state: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        goal: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        amount_collected: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        img: {
            type: DataTypes.TEXT,
            defaultValue: 'https://res.cloudinary.com/df4kwquv8/image/upload/v1679261253/emprendar_sources/mzjvegpc6r8g1vhuthmp.jpg'
        },
        /* user_name: {
            type: DataTypes.STRING
        }, */
        /* country: {
            type: DataTypes.ENUM('Argentina', 'Chile', 'Bolivia', 'Paraguay', 'Uruguay', 'Colombia', 'Peru'),
            allowNull: true
          }, */
        validated: {
            type: DataTypes.ENUM('aceptado', 'rechazado', 'espera'),
            defaultValue: 'espera'
        }
    }, { paranoid: true }) //habilitar el borrado logico
}