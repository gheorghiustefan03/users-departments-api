const {userTable, departmentTable} = require('../models');
const bcrypt = require('bcrypt');

const hashPassword = async (password)=>{
    const noRounds = 10;
    const salt = await bcrypt.genSalt(noRounds);
    const newPass = await bcrypt.hash(password, salt);

    return newPass;
}

//todo  -validations
//      -upload pfp
//      -login

const userController = {
    createUser: async (req, res)=>{
        try {
            const {firstName, lastName, email, password, profilePicFile, DepartmentId} = req.body;
            //validations
            const payload ={
                firstName,
                lastName,
                email,
                password,
                profilePicFile,     //string for now
                DepartmentId
            };

            if(DepartmentId || DepartmentId === ""){
                const department = await departmentTable.findByPk(DepartmentId);
                if(!department){
                    res.status(400).json({message: 'Invalid department id provided'});
                    return;
                }
            }

            payload.password = await hashPassword(payload.password);
            const createdUser = await userTable.create(payload);
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
            const {firstName, lastName, email, password, profilePicFile} = req.body;
            //validations
            const payload ={
                firstName,
                lastName,
                email,
                password,
                profilePicFile   //string for now
            };
            user.update(payload);
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
            res.status(200).json({message: `User with id ${req.params.id} deleted`});
        } catch (error) {
            res.status(500).json({message: 'Server error'});
        }
    },
    loginUser: async (req, res)=>{
        res.status(500).json({message: 'Not yet implemented'});
        //to implement
    }
}

module.exports = userController;