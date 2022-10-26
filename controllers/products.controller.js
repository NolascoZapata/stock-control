const ProdDao = require('./../models/daos/Products.dao')
const products = new ProdDao()
const categories = ["baby", "girl", "boy"]

const getAllProdController = async (req, res, next) => {
  try {
    const prods = await products.getAll()
    console.log('[GET]==> Get Products')
    res.status(200).json(prods)
  } catch (error) {
    console.log('error', error.message)
    next(error)
  }
}
const getProdByParamController = async (req, res, next) => {
  let {
    params
  } = req.params
  let p = categories.find(cat => cat === params)
  if (p !== undefined) {
    //getProdByCategoryController
    try {
      const prods = await products.getProductsByCategory(params)
      console.log(`[GET]==> Get Products By Category ${params}`)
      res.status(200).json(prods)
    } catch (error) {
      console.log('error', error.message)
      next(error)
    }
  } else {
    //getProdByIdController
    try {
      const prod = await products.getProductById(params)
      console.log(`[GET]==> Get Product with id '${params}'`)
      res.status(200).json(prod)
    } catch (error) {
      console.log('error', error.message)
      next(error)
    }
  }
}
//only admin
const saveProdController = async (req, res, next) => {
  try {
    const newprod = await products.saveProduct(req.body)
    console.log('[POST]==> Product saved')
    res.status(200).redirect('/home')
  } catch (error) {
    console.log('error', error.message)
    next(error)
  }
}

// const updateProdController= async(req,res,next)=>{
//     try {
//         const {id} = req.params.id
//         await products.model.findOne({id})
//                 .then((prod)=>{
//                     prod.name=req.body.name;
//                     prod.price=req.body.price;
//                     prod.size=req.body.size;
//                     prod.imgDir=req.body.imgDir;
//                     prod.category=req.body.category;
//                     prod.stock=req.body.stock;
//                     prod.timestamp= new Date()
//                     prod.save()
//                         .then(()=>{
//                             console.log('info','[PUT]==> Product updated')
//                             res.json({prod})

//                         })
//                 })
//     } catch (error) {
//         console.log('error',error.message)
//         next(error)
//     }
// }

const deleteAllProdController = async (req, res, next) => {
  try {
    const prod = await products.deleteAllProducts()
    console.log(`[DELETE]==> All products have been deleted`)
    res.status(200).json(prod)
  } catch (error) {
    console.log('error', error.message)
    next(error)
  }
}
const deleteProdByParamController = async (req, res, next) => {
  let {
    params
  } = req.params
  let p = categories.find(cat => cat === params)
  if (p !== undefined) {
    //deleteProdByCategory
    try {
      const prods = await products.deleteProductByCategory(params)
      console.log(`[DELETE]==> Delete Products By Category ${params}`)
      res.status(200).json(prods)
    } catch (error) {
      console.log('error', error.message)
      next(error)
    }
  } else {
    //deleteProdById
    try {
      const prod = await products.deleteProductById(params)
      console.log(`[DELETE]==> DELETE Product with id '${params}'`)
      res.status(200).json({
        product: prod.name,
        status:"Deleted"
      })
    } catch (error) {
      console.log('error', error.message)
      next(error)
    }
  }
}



module.exports = {
  getAllProdController,
  getProdByParamController,
  saveProdController,
  deleteAllProdController,
  deleteProdByParamController

}