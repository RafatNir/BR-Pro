const express = require('express');
const {
  getBusinessRegistrations,
  createBusinessRegistration,
  getBusinessRegistrationById,
  updateBusinessRegistration,
  deleteBusinessRegistration,
} = require('../controllers/businessRegistrationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getBusinessRegistrations).post(createBusinessRegistration);

router
  .route('/:id')
  .get(getBusinessRegistrationById)
  .put(updateBusinessRegistration)
  .delete(deleteBusinessRegistration);

module.exports = router;
