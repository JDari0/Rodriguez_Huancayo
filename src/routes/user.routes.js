//Ruta para listar todos los usuarios que tenemos

import {Router} from 'express'
const router = Router()

import * as userCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

//Ruta para crear los usuarios 
router.post("/", [
   authJwt.verifyToken, //confirmar si tiene un token
   authJwt.isAdmin,     //confirmar si es un admin
   verifySignup.checkRolesExisted //verificar si el rol existe
] ,userCtrl.createrUser);

export default router;