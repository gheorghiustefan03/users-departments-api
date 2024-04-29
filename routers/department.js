const express = require('express');
const router = express.Router();
const { departmentController } = require('../controllers');
const middlewares = require('../controllers/middleware').department;

router.route('/create').post(middlewares.checkDepartmentPayload, departmentController.createDepartment);
router.route('/get').get(departmentController.getAllDepartments);
router.route('/get/:id').get(departmentController.getDepartmentById);
router.route('/update').put(middlewares.checkDepartmentPayload, middlewares.checkMaxMembers, departmentController.updateDepartment);
router.route('/delete/:id').delete(departmentController.deleteDepartment);

module.exports = router;