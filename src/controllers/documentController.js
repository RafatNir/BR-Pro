const Document = require('../models/Document');
const mongoose = require('mongoose');

const getValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return new mongoose.Types.ObjectId(id);
};

const pickAllowedFields = (payload, fields) => {
  const updates = {};

  fields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(payload, field)) {
      updates[field] = payload[field];
    }
  });

  return updates;
};

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ createdBy: req.user._id });
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createDocument = async (req, res) => {
  try {
    const document = await Document.create({
      ...req.body,
      createdBy: req.user._id,
    });

    return res.status(201).json(document);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const documentId = getValidObjectId(req.params.id);
    if (!documentId) {
      return res.status(400).json({ message: 'Invalid Document id' });
    }

    const document = await Document.findOne({ _id: documentId, createdBy: req.user._id });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    return res.status(200).json(document);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateDocument = async (req, res) => {
  try {
    const documentId = getValidObjectId(req.params.id);
    if (!documentId) {
      return res.status(400).json({ message: 'Invalid Document id' });
    }

    const updates = pickAllowedFields(req.body, ['title', 'description', 'fileUrl', 'documentType']);

    const document = await Document.findOneAndUpdate(
      { _id: documentId, createdBy: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    return res.status(200).json(document);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const documentId = getValidObjectId(req.params.id);
    if (!documentId) {
      return res.status(400).json({ message: 'Invalid Document id' });
    }

    const document = await Document.findOneAndDelete({ _id: documentId, createdBy: req.user._id });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    return res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getDocuments,
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
};
