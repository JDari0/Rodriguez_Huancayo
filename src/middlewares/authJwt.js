//Funcion que se encarga de verificar si estoy enviando un token
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {

   try {

      //Se recibe un torken
      const token = req.headers["x-access-token"];

      //Para comprobar si el token no existe
      if (!token) return res.status(403).json({ message: "No token provided" })

      // Si existe extraemos lo que esta dentro del token
      const decoded = jwt.verify(token, config.SECRET)
      req.userId = decoded.id;

      //Para comprobar si el usuario no existe
      const user = await User.findById(req.userId, { password: 0 })
      if (!user) return res.status(404).json({ message: "no user found" })

      next() // si existe continua creando un producto

   } catch (error) {
      return res.status(401).json({message: "Unauthorized"})

   }

} 