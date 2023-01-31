// Para crear unas cuantas validaciones
// Si el usuario ya existe o si el rol enviado existe tambien

import { ROLES } from "../models/Role";
import User from "../models/User";

//Funcion para ver si algun usuario o email esta repetido (si ya existe)
export const checkDuplicatedUsernameOrEmai = async (req, res, next) => {
   
   //Si el user que pasa el usuario existe
   const user = await User.findOne({username: req.body.username}) //Busco el username que el usuario pasa
   if (user) return res.status(400).json({message: 'The user already exists'})

   //Si el email que pasa el usuario existe
   const email = await User.findOne({email: req.body.email}) //Busco el email que el usuario pasa
   if(email) return res.status(400).json({message: 'The email already exists'})

   //Si no continua normalmente
   next();
}


//Funcion para verificar si los roles existen
export const checkRolesExisted = (req, res, next) => {
   if (req.body.roles) {
      for (let i=0; i< req.body.roles.length; i++){
         if (!ROLES.includes(req.body.roles[i])) { //si no esta el rol que el usuario me esta pasando
            return res.status(400).json({
               message: `Role ${req.body.roles[i]} does not exists`

            })            
         }
      }
   }
   next();
}  