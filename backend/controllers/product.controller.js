import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.image || !product.price) {
    return res.status(400).json({ success: false, message: "Fill in All required fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    return res.status(200).json({ success: true, message: "Product added successfully", data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }

}
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("id:", id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, 'message': `product not found ` })
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ 'success': true, 'message': `product id ${id} deleted successfully ` });
  } catch {
    res.status(500).json({ 'success': false, 'message': `server error ` })
  }
}

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ 'success': true, 'message': `products returned successfully `, data: products });
}
export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  // console.log("id:", id, "product", product)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, 'message': `products not found ` })
  }
  try {
    const updated = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ 'success': true, 'message': `products returned successfully `, 'data': updated })
  } catch (error) {
    res.status(500).json({ 'success': false, 'message': `server error ` })
  }

}
