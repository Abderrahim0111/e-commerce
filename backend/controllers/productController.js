const Product = require("../models/productShema");
const jwt = require('jsonwebtoken')

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadProductImages = async (req, res) => {
  const token = req.cookies.jwt
  const decoded = await jwt.verify(token, process.env.JWT)
  if(decoded.id !== process.env.ADMIN){
    return res.json({error: 'admin only'})
  }
  if (req.files.length === 0) {
    return res.json({ error: "No files to upload chosen" });
  }
  if (req.files.length > 6) {
    return res.json({ error: "The maximum is 6" });
  }
  try {
    const imageUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
    }
    res.json(imageUrls);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  const token = req.cookies.jwt 
  const decoded = await jwt.verify(token, process.env.JWT)
  if(decoded.id !== process.env.ADMIN){
    return res.json({error: 'admin only'})
  }
  try {
    const product = await Product.create(req.body);
    res.json({ productId: product._id });
  } catch (error) {
    res.json({ error: error });
  }
};

const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({updatedAt: -1});
    res.json(products);
  } catch (error) {
    res.json({ error: error });
  }
};

const fetchProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) {
    res.json({ error: error });
  }
};

const deleteProduct = async (req, res) => {
  const token = req.cookies.jwt
  const decoded = await jwt.verify(token, process.env.JWT)
  if(decoded.id !== process.env.ADMIN){
    return res.json({error: 'admin only'})
  }
  try {
    const deleted = await Product.deleteOne({ _id: req.params.productId });
    if (!deleted) {
      return res.json({ error: "detete error" });
    }
    res.json({ message: "product deleted successfully" });
  } catch (error) {
    res.json({ error: error });
  }
};

const updateProduct = async (req, res) => {
  const token = req.cookies.jwt
  const decoded = await jwt.verify(token, process.env.JWT)
  if(decoded.id !== process.env.ADMIN){
    return res.json({error: 'admin only'})
  }
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (updated) {
      res.json({ message: "Product updated succesfully!" });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

const searchProducts = async (req, res) => {
  try {

    
let brand = req.query.brand;    if (brand === undefined || brand === "all") {
      brand = { $in: ["apple", "sumsung", "hp", "huawei", "msi"] };
    }

    let freeShipping = req.query.freeShipping;
    if (freeShipping === undefined || freeShipping === "false") {
      freeShipping = { $in: [true, false] };
    }

    let category = req.query.category;
    if (category === undefined || category === "all") {
      category = { $in: ["phones", "laptops", "tablets", "monitors", "tvs"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const products = await Product.find({
      title: { $regex: searchTerm, $options: "i" },
      brand,
      freeShipping,
      category
    }).sort({ [sort]: order });
    res.json(products);
  } catch (error) {
    res.json({ error: error });
  }
};

const fetchSimilarProducts = async (req, res) => {
  try {
    const currentProduct = await Product.findById(req.params.productId);
    if (!currentProduct) {
      return res.json({ error: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: req.params.productId }, // Excluding the current product ID
      category: currentProduct.category,
    });

    res.json(similarProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.productId, { quantity: req.body.modifiedQuanity }, { new: true })
    res.json(updated)
  } catch (error) {
    res.json({error: error})
  }
}


module.exports = {
  uploadProductImages,
  createProduct,
  fetchProducts,
  fetchProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
  fetchSimilarProducts,
  updateQuantity
};
