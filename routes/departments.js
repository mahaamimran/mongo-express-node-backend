const express = require('express');
const router = express.Router();
const {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.use(auth, checkRole(['admin']));

router.route('/')
  .post(createDepartment)
  .get(getAllDepartments);

router.route('/:id')
  .get(getDepartment)
  .put(updateDepartment)
  .delete(deleteDepartment);

module.exports = router; 