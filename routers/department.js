const express = require('express');
const router = express.Router();
const {departmentController} = require('../controllers');

router.post('/create', departmentController.createDepartment);
router.get('/get', departmentController.getAllDepartments);
router.get('/get/:id', departmentController.getDepartmentById);
router.put('/update/:id', departmentController.updateDepartment);
router.delete('/delete/:id', departmentController.deleteDepartment);

module.exports = router;