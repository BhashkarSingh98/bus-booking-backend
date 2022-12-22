const Product = require("../models/Product");
const router = require("express").Router();


//Get Product
router.get("/find/:id", async (req, res)=>{
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
});

// //Get all Products
router.get("/", async (req, res)=>{
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if(qNew){
      products = await Product.find().sort({createdAt: -1}).limit(5);
    }
    else if(qCategory){
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }
    else{
      products = await Product.find();
    }

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
})


module.exports = router;
