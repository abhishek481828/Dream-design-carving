const Product = require("../models/Product");
const { cloudinary } = require("../middleware/uploadMiddleware");

exports.getProducts = async (req, res) => {
  try {
    const { category, search, sort } = req.query;

    let query = {};

    // Filter by Category
    if (category) {
      query.category = category;
    }

    // Search (Name or Description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }



    let products = Product.find(query);

    // Sorting
    if (sort) {
      if (sort === 'newest') products = products.sort({ createdAt: -1 });
    }

    const results = await products;
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, featured, image } = req.body;

    // If file uploaded via Cloudinary, use secure_url; else use image URL from body
    let imagePath = image;
    if (req.file) {
      imagePath = req.file.path; // Cloudinary returns the URL as `path`
    }

    const product = new Product({
      name,
      description,
      category,
      featured,
      image: imagePath
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, category, featured, image } = req.body;
    let updateData = { name, description, category, featured, image };

    if (req.file) {
      // New file uploaded — use Cloudinary URL
      updateData.image = req.file.path;

      // Delete old image from Cloudinary if it was a Cloudinary URL
      const existing = await Product.findById(req.params.id);
      if (existing && existing.image && existing.image.includes('cloudinary')) {
        const publicId = existing.image.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete image from Cloudinary if it's a Cloudinary URL
    if (product.image && product.image.includes('cloudinary')) {
      const publicId = product.image.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

