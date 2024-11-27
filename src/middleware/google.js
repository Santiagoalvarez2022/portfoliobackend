const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User} = require('../db')
const {userByID} = require('../controllers/user/userController')
const { generateJWT } = require("../..//utils/generateJWT");

require('dotenv').config()





module.exports = {passport}
