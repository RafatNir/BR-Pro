const BusinessRegistration = require('../models/BusinessRegistration');

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
    const record = await BusinessRegistration.findOne({
      _id: req.params.id,
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
    const record = await BusinessRegistration.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
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
    const record = await BusinessRegistration.findOneAndDelete({
      _id: req.params.id,
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
