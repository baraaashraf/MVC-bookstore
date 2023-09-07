const productsModel = require('../models/products.model')


exports.getHome = (req,res,next)=>{
    //get prodeucts
    //render index.ejs

    productsModel.getAllProducts().then(products=>{
        res.render('index',{
            products:products
        })
    })
}