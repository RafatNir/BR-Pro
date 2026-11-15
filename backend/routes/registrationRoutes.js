const express = require("express");

const authMiddleware =
require("../middleware/authMiddleware");

const router = express.Router();

const {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
} = require(
  "../controllers/registrationController"
);

router.post(
    "/",
    authMiddleware,
    createRegistration
);

router.get(
    "/",
    getRegistrations
);

router.get(
    "/:id",
    getRegistrationById
);

router.put(
    "/:id",
    authMiddleware,
    updateRegistration
);

router.delete(
    "/:id",
    authMiddleware,
    deleteRegistration
);

module.exports = router;