const { Router } = require("express");
const {
  postUserHanlder,
  getAllUsersHandler,
  getAllUserByIdHandler,
  putUserHandler,
  deleteUserHandler,
  confirmeUserHl,
  authUserHl,
  getAllUserDataAdmin,
  authedUserhl, deleteUserByAdminHl,
  resetPasswordHl,
  newPasswordHl,
  comprobarTokenHl,
  changePasswordHl,
  contactUsHl, enableUserByAdminHl,
  verifyPasswordHl
} = require("../controllers/user/userHandler");
const { checkAuth } = require("../middleware/checkAuth");
const routerUser = Router();
const { passport } = require("../middleware/google");
/* creado de usuario */
routerUser.post("/", postUserHanlder);

/* rutas generales de la pagina */

/* traer todos los usuarios aptos para mostrar en front
(sin datos propios del usuario, lo que se puede mostrar) */
routerUser.get("/", getAllUsersHandler);
/* para ir al detail del user "X", inclusion de los datos propios
de su actividad como usuario, como los proyectos del mismo */
routerUser.get("/:id", getAllUserByIdHandler);
/* update de datos del usuario. cambio de "user_name", "name", "last_name", "email", "pasword" */
routerUser.put("/:id", putUserHandler);
/* borrado logico del usuario
TODO: "no se". faltaria cuando hagamos el auth, que el usuario "borrado", no pueda ingresar.
TODO: una funcion que mande y cargue un token a la tabla del usuario para volver a recuperar la cuenta */
routerUser.delete("/:id", deleteUserHandler);

/* login // confirmacion de email */
routerUser.get("/confirmar/:token", confirmeUserHl);
routerUser.post("/login", authUserHl);

routerUser.get("/login/me", checkAuth, authedUserhl);

/* ruta de ADMINS. */
routerUser.get("/admin/users", getAllUserDataAdmin);
routerUser.put("/admin/enableUser/:id", enableUserByAdminHl)
routerUser.put("/admin/deleteUser/:id", deleteUserByAdminHl)
routerUser.post('/config/resetpassword', resetPasswordHl)
routerUser.get('/config/resetpassword/:token', comprobarTokenHl)
routerUser.post('/config/resetpassword/:token', newPasswordHl)
routerUser.post('/config/changepassword/', changePasswordHl)
routerUser.post('/config/verifyPassword', verifyPasswordHl)
routerUser.post('/contactUs/sendMessage', contactUsHl)
module.exports = routerUser;
