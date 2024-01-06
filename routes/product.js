const express=require("express");
const router=express.Router();
const Product =require("../models/Product");
const { isProductAuthor,isLoggedIn } = require("../middleware");


// To show products 
router.get("/blog",async(req,res)=>
{
    try{    
    let products=await Product.find({});
    res.render('blog/index',{products})
    }
    catch(err)
    {
        console.log(err);
        res.status(500).render('blog/error', { error: err });
    }
});

// To upload products 
router.get("/blog/new",isLoggedIn,(req,res)=>{
    try{
    res.render('blog/new');
    }
    catch(err)
    {
        console.log(err);
        res.status(500).render('blog/error', { error: err });
    }
});

// To Add the  products 
router.post("/blogs",isLoggedIn,async(req,res)=>{
    try{
    let {name,type,image,content,desc}=req.body;
    await Product.create({name,type,image,content,desc,author:req.user._id});
    res.redirect("/blog");
    }
    catch(e)
    {
        // console.log(err);
        res.send(e)
    }
});

// To show particular product
router.get("/blog/:id",async(req,res)=>{
    try{
    let {id}=req.params;
    let foundProduct=await Product.findById(id);
    // console.log(req.flash('info', 'hello!'))
    res.render('blog/show',{foundProduct});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).render('blog/error', { error: err });;
    }
});

// To Edit particular Products  use form 
router.get('/blog/:id/edit',isLoggedIn,async(req,res)=>{
    try{
    let {id}=req.params;
    let foundProduct=await Product.findById(id);
    res.render('blog/edit',{foundProduct});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).render('blog/error', { error: err });;
    }
});

// To actually edit the data in database
router.patch('/blog/:id',isLoggedIn, async(req,res)=>{
    try{
    let {id} = req.params;
    let {name,image,content} = req.body;
    await Product.findByIdAndUpdate(id , {name,image,content});
   res.redirect(`/blog/${id}`)
    }
    catch(err)
    {
        console.log(err);
        res.status(500).render('error', { error: err });;
    }
})

// To delete a Product 
router.delete('/blog/:id',isLoggedIn,isProductAuthor,async(req,res)=>{
    try{
    let {id}=req.params;
   
    await Product.findByIdAndDelete(id);
    res.redirect('/blog');
    }
    catch(err)
    {
        console.log(err);
        res.status(500).render('error', { error: err });
    }
});

module.exports=router; 

// session storage?/ client
// session >> server 
// session ko khol ne ke liye scecret chaiyeo
// express -session middleware secret 