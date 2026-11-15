const BusinessRegistration =
  require("../models/BusinessRegistration");

// Create
const createRegistration = async (req, res) => {
  try {
    const registration =
      await BusinessRegistration.create(req.body);

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Read All
const getRegistrations = async (req, res) => {
  try {
    const registrations =
      await BusinessRegistration.find();

    res.json(registrations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Read One
const getRegistrationById = async (req, res) => {
  try {
    const registration =
      await BusinessRegistration.findById(
        req.params.id
      );

    res.json(registration);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update
const updateRegistration = async (req, res) => {
  try {
    const registration =
      await BusinessRegistration.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(registration);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete
const deleteRegistration = async (req, res) => {
  try {
    await BusinessRegistration.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Registration deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
};