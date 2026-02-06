const Product = require("../models/Product");

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

    let imagePath = image;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
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
      updateData.image = `/uploads/${req.file.filename}`;
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
    console.log("Attempting to delete product with ID:", req.params.id);
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      console.error("Delete Product: Product not found");
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("Delete Product: Success");
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

