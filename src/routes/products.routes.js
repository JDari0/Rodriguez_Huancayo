import {Router} from 'express'
const router = Router() 

import * as productsCtrl from '../controllers/products.controller'


router.post('/',productsCtrl.crearteProduct)

router.get('/',productsCtrl.getProducts)

router.get('/:productId',productsCtrl.getProductById)

router.put('/:productId',productsCtrl.updateProductById)

router.delete('/:productId',productsCtrl.deleteProductById)

export default router;  