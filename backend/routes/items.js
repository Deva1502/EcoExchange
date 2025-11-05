const express = require('express');
const multer = require('multer');
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/itemController');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

router.route('/')
  .get(getItems)
  .post(upload.single('imageFile'), createItem);

router.route('/:id')
  .get(getItem)
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;
