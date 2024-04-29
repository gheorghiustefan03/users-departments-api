const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const userMiddleware = require('../controllers/middleware').user;

router.route('/create').post(userMiddleware.uploadPfp, userMiddleware.checkUserPayload, userController.createUser);
router.route('/get').get(userController.getAllUsers);
router.route('/get/:id').get(userController.getUserById);
router.route('/update/:id').put(userMiddleware.uploadPfp, userMiddleware.checkUserPayload, userController.updateUser);
router.route('/delete/:id').delete(userController.deleteUser);
router.route('/login').post(userController.loginUser);
router.route('/getLoggedInUser').get(userController.getLoggedInUser);
router.route('/logout').get(userController.logout)

module.exports = router;