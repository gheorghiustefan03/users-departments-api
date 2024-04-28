const {userTable} = require('../models');
const bcrypt = require('bcrypt');
const fs = require("fs");
const path = require('node:path'); 

const hashPassword = async (password)=>{
    const noRounds = 10;
    const salt = await bcrypt.genSalt(noRounds);
    const newPass = await bcrypt.hash(password, salt);

    return newPass;
}

//todo - login

const userController = {
    createUser: async (req, res)=>{
        try {
            const {firstName, lastName, email, password, DepartmentId} = req.body;

            const payload ={
                firstName,
                lastName,
                email,
                password,
                DepartmentId
            };

            payload.password = await hashPassword(payload.password);
            const createdUser = await userTable.create(payload);
            if(req.file != null){
                fs.copyFile(req.file.path, "profile_pics\\" + createdUser.id + path.extname(req.file.originalname), (err) => {
                    if (err) throw err;
                  });
                fs.unlink(req.file.path, err => {
                    if(err) throw err;
                });
            }
            res.status(200).json(createdUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server error'});
        }
    },
    getAllUsers: async (req, res)=>{
        try {
            const users = await userTable.findAll();
            if(users.length === 0){
                res.status(400).json({message: 'No users in database'});
            }
            else{
                res.status(200).json(users);   
            }
        } catch (error) {
            res.status(500).json({message: 'Server error'});
        }
    },
    getUserById: async (req, res)=>{
        try {
            const user = await userTable.findByPk(req.params.id);
            if(!user){
                res.status(404).json({message: `No user with id ${req.params.id} in database`});
            }
            else{
                res.status(200).json(user);   
            }
        } catch (error) {
            res.status(500).json({message: 'Server error'});
        }
    },
    updateUser: async (req, res)=>{
        try {
            const user = await userTable.findByPk(req.params.id);
            if(!user){
                res.status(404).json({message: `No user with id ${req.params.id} in database`});
                return;
            }
            const {firstName, lastName, email, password, DepartmentId} = req.body;
            const payload ={
                firstName,
                lastName,
                email,
                password,
                DepartmentId
            };
            user.update(payload);
            if(req.file != null){
                fs.copyFile(req.file.path, 'profile_pics\\' + user.id + path.extname(req.file.originalname), err =>{
                    if(err) throw err;
                })
                fs.unlink(req.file.path, err => {
                    if(err) throw err;
                })
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: 'Server error'});
        }
    },
    deleteUser: async (req, res)=>{
        try {
            const user = await userTable.findByPk(req.params.id);
            if(!user){
                res.status(404).json({message: `User with id ${req.params.id} not in database`});
                return;
            }
            user.destroy();

            let pfpPath = ('.\\profile_pics\\' + req.params.id + '.');
            if(fs.existsSync(pfpPath + 'png'))
                pfpPath += 'png';
            else if(fs.existsSync(pfpPath + 'jpg'))
                pfpPath += 'jpg';
            else if(fs.existsSync(pfpPath + 'jpeg'))
                pfpPath += 'jpeg';
            console.log(pfpPath);
            if(/png|jpeg|jpg/.test(pfpPath))
                fs.unlinkSync(pfpPath);

            res.status(200).json({message: `User with id ${req.params.id} deleted`});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server error'});
        }
    },
    loginUser: async (req, res)=>{
        res.status(500).json({message: 'Not yet implemented'});
        //to implement
    }
}

module.exports = userController;