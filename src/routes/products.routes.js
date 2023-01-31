import {Router} from 'express'
const router = Router() 

import * as productsCtrl from '../controllers/products.controller'
import { verifyToken } from "../middlewares";

router.post('/',verifyToken, productsCtrl.createProduct)

router.get('/',productsCtrl.getProducts)

router.get('/:productId',productsCtrl.getProductById)

router.put('/:productId',verifyToken,productsCtrl.updateProductById)

router.delete('/:productId',verifyToken,productsCtrl.deleteProductById)

export default router;  