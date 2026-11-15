const BusinessRegistration = require('../models/BusinessRegistration');
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

const getBusinessRegistrations = async (req, res) => {
  try {
    const records = await BusinessRegistration.find({ createdBy: req.user._id });
    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createBusinessRegistration = async (req, res) => {
  try {
    const record = await BusinessRegistration.create({
      ...req.body,
      createdBy: req.user._id,
    });

    return res.status(201).json(record);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getBusinessRegistrationById = async (req, res) => {
  try {
    const recordId = getValidObjectId(req.params.id);
    if (!recordId) {
      return res.status(400).json({ message: 'Invalid BusinessRegistration id' });
    }

    const record = await BusinessRegistration.findOne({
      _id: recordId,
      createdBy: req.user._id,
    });

    if (!record) {
      return res.status(404).json({ message: 'BusinessRegistration not found' });
    }

    return res.status(200).json(record);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateBusinessRegistration = async (req, res) => {
  try {
    const recordId = getValidObjectId(req.params.id);
    if (!recordId) {
      return res.status(400).json({ message: 'Invalid BusinessRegistration id' });
    }

    const updates = pickAllowedFields(req.body, [
      'businessName',
      'ownerName',
      'registrationNumber',
      'status',
    ]);

    const record = await BusinessRegistration.findOneAndUpdate(
      { _id: recordId, createdBy: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({ message: 'BusinessRegistration not found' });
    }

    return res.status(200).json(record);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteBusinessRegistration = async (req, res) => {
  try {
    const recordId = getValidObjectId(req.params.id);
    if (!recordId) {
      return res.status(400).json({ message: 'Invalid BusinessRegistration id' });
    }

    const record = await BusinessRegistration.findOneAndDelete({
      _id: recordId,
      createdBy: req.user._id,
    });

    if (!record) {
      return res.status(404).json({ message: 'BusinessRegistration not found' });
    }

    return res.status(200).json({ message: 'BusinessRegistration deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBusinessRegistrations,
  createBusinessRegistration,
  getBusinessRegistrationById,
  updateBusinessRegistration,
  deleteBusinessRegistration,
};
