const Document = require('../models/Document');

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
    const document = await Document.findOne({ _id: req.params.id, createdBy: req.user._id });

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
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
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
    const document = await Document.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });

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
