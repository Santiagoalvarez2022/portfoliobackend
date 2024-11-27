require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST, PGPORT } = process.env;
const bcrypt = require("bcrypt")

//conexion online
// const sequelize = new Sequelize(
//   "postgres://emprendar_r2dy_user:9JBOHhbNSD9uBMDuSdEzHhQXaPCQ3lZx@dpg-col816ocmk4c73bnfdjg-a.oregon-postgres.render.com/emprendar_r2dy",
//   {
//     dialect: "postgres",
//     logging: false,
//     native: false,
//     dialectOptions: {
//       ssl: true
//     }
//   }
// );

//conexion local

const sequelize = new Sequelize(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`,
  {
    dialect: "postgres",
    logging: false,
    native: false,
  }
);
 




//creamos una funcion para conectarnos a la bd
const conectarDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    //si hay un error consologear y salir de la conexion
    console.log(error);
    process.exit(1);
  }
};
/* contenedor de los archivos contenidos en la carpeta models */
const modelDefiners = [];
/* hace una diferencia de index.js (no seria necesaria en nuestro caso, pero no esta mal ponerlo) */
const basename = path.basename(__filename);

/* agregamos cada uno de los archivos a un array "modelDefiners" */
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });
/* le pasamos por params a cada uno de los modelos definidos en la carpeta models "sequelize" */

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("tablas creadas");
  })
  .then(async () => {
    let arrCategory = [
      "tecnología",
      "ambiental",
      "cultural",
      "social",
      "medicina",
      "educación",
      "emprendimiento",
      "null1",
      "null2",
      "null3",
      "null4",
    ];

    const arrCountry = [
      "México",
      "Colombia",
      "Argentina",
      "Brasil",
      "Chile",
      "Perú",
      "Ecuador",
      "Bolivia",
      "Uruguay",
      "Paraguay",
      "Venezuela",
      "Costa Rica",
      "Cuba",
      "Puerto Rico",
      "República Dominicana",
      "Honduras",
      "Nicaragua",
      "Panamá",
      "El Salvador",
      "Guatemala",
    ];

    let admin =  { user_name: "Emprendar", name: "Emprendar", last_name: "Admin", email: "emprendar@emprendar.com", password: "emprendar123", profile_img: "", confirmed: true, isAdmin: true }

    // await User.findOrCreate(
    //   {
    //     ...admin,password: await bcrypt.hash(admin.password, 8)
    //   }
    // )
    await User.findOrCreate({
      where:{user_name : admin.user_name},
      defaults:{
        ...admin,
        password: await bcrypt.hash(admin.password, 8)
      } 
    })
/

    arrCountry.forEach(async (country) => {
      Country.findOrCreate({
        where : {
          name: country
        },
        defaults : { 
          name: country,

        } 

      });
    });



    arrCategory.forEach(async (cat) => {
      await Category.findOrCreate({
        where : {name:cat},
        defaults : {
          name: cat,

        }
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });

const { Project, User, Category, Comment, Country, Reputation } =
  sequelize.models;

/* relacion de uno a muchos entre User(uno) a project */
User.hasMany(Project);
Project.belongsTo(User);

/* relacion de muchos a muchos entre Project y Category */
Project.belongsToMany(Category, {
  through: "middle_Project_Category",
  timestamps: false,
});
Category.belongsToMany(Project, {
  through: "middle_Project_Category",
  timestamps: false,
});

/* relacion de uno a muchos entre Country y Project */
Country.hasMany(Project);
Project.belongsTo(Country);

/* relacion de muchos a uno entre 3 tablas. Comment, Project, User */
/* en User */
User.hasMany(Comment);
Comment.belongsTo(User);
/* en Project */
Project.hasMany(Comment);
Comment.belongsTo(Project);

/* relacion de muchos a muchos  */

//exportamos la funcion y la instancia para luego crear los modelos

module.exports = { conectarDB, ...sequelize.models, sequelize };
