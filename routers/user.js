const express = require('express');
const router = express.Router();
const {userController} = require('../controllers');
const userMiddleware = require('../controllers/middleware').user;

router.route('/create').post(userMiddleware.checkUserPayload, userController.createUser);
router.route('/get').get(userController.getAllUsers);
router.route('/get/:id').get(userController.getUserById);
router.route('/update/:id').put(userMiddleware.checkUserPayload, userController.updateUser);
router.route('/delete/:id').delete(userController.deleteUser);
router.route('/login').get(userController.loginUser);

module.exports = router;