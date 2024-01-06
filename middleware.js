const Product = require("./models/Product");



const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next();
}

const isSeller=(req,res,next)=>{
    if(!req.user.role)
    {
        return res.redirect('/products');
    }
    else if(req.user.role!=='seller')
    {
        return res.redirect('/products');
    }
    next();
}
const isProductAuthor=async(req,res,next)=>{
    let {id}=req.params;
    let products=await Product.findById(id);
    if(!products.author.equals(req.user._id))
    {
        return res.redirect('/products')
    }
    next();
}
module.exports={isProductAuthor,isSeller,isLoggedIn};