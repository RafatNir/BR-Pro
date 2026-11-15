const express = require('express');
const {
  getDocuments,
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
} = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getDocuments).post(createDocument);

router.route('/:id').get(getDocumentById).put(updateDocument).delete(deleteDocument);

module.exports = router;
