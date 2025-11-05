const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
exports.getItems = async (req, res) => {
  try {
    const { search, condition, status, page = 1, limit = 10 } = req.query;

    let query = {};

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by condition
    if (condition) {
      query.condition = condition;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const items = await Item.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Item.countDocuments(query);

    res.status(200).json({
      success: true,
      count: items.length,
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit),
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new item
// @route   POST /api/items
// @access  Public
// const Item = require('../models/Item');
const cloudinary = require('../utils/cloudinary');

const uploadToCloudinary = (buffer, folder = 'ecoexchange') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });
};

exports.createItem = async (req, res) => {
  try {
    const { name, condition, location, description, image } = req.body;
    if (!name || !condition || !location || !description) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    let imageUrl = image; // if client sent URL
    if (!imageUrl && req.file && req.file.buffer) {
      const uploaded = await uploadToCloudinary(req.file.buffer, 'ecoexchange/items');
      imageUrl = uploaded.secure_url;
    }
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Provide image URL or upload a file' });
    }

    const item = await Item.create({ name, image: imageUrl, condition, location, description });
    res.status(201).json({ success: true, message: 'Item created successfully', data: item });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};


// @desc    Update item status
// @route   PUT /api/items/:id
// @access  Public
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Public
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};