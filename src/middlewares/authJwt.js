//Funcion que se encarga de verificar si estoy enviando un token
import jwt from "jsonwebtoken";
import config from "../config";

import User from "../models/User";
import Role from "../models/Role";


export const verifyToken = async (req, res, next) => {

   try {

      //Se recibe un torken
      const token = req.headers["x-access-token"];

      //Para comprobar si el token no existe
      if (!token) return res.status(403).json({ message: "No token provided" });

      // Si existe extraemos lo que esta dentro del token
      const decoded = jwt.verify(token, config.SECRET);
      req.userId = decoded.id;

      //Para comprobar si el usuario no existe
      const user = await User.findById(req.userId, { password: 0 });
      if (!user) return res.status(404).json({ message: "no user found" });

      next(); // si existe continua creando un producto

   } catch (error) {
      return res.status(401).json({message: "Unauthorized"})
   }
};


//Creacion de funciones para comprobar si es moderador o Admin
export const isModerator = async (req, res, next) =>{

   //Para obtener el id del usuario 
   const user = await User.findById(req.userId)

   //Para comprobar los roles
   const roles = await Role.find({_id: {$in: user.roles}})

   for (let i = 0; i < roles.length; i++) {
      if(roles[i].name === 'moderator'){
         next()
         return;
      }
   }
   return res.status(403).json({message: "Require Moderator role"})
};

export const isAdmin = async (req, res, next) =>{
      //Para obtener el id del usuario 
      const user = await User.findById(req.userId)

      //Para comprobar los roles
      const roles = await Role.find({_id: {$in: user.roles}})
   
      for (let i = 0; i < roles.length; i++) {
         if(roles[i].name === 'admin'){
            next()
            return;
         }
      }
      return res.status(403).json({message: "Require Admin role"})
};