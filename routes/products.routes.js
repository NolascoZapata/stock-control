const express = require('express');
const router = express.Router();
const {
  getAllProdController,
  getProdByParamController,
  saveProdController,
  deleteAllProdController,
  deleteProdByParamController
} = require ('../controllers/products.controller')

//middlewares
router.use(express.json())
router.use(express.urlencoded({extended: true}))

//Routes
//everyone
router.get('/', getAllProdController);
router.get('/:params',getProdByParamController);


////only admin
router.post('/',saveProdController);
// router.put('/:params',updateProdByParamController);
router.delete('/',deleteAllProdController)
router.delete('/:params',deleteProdByParamController);








module.exports = router