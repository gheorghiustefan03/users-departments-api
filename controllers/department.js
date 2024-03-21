const {departmentTable} = require('../models');

const departmentController = {
    createDepartment: async (req, res)=>{
    try {
        const {departmentName, maxMembers} = req.body;
        const payload = {
            departmentName,
            maxMembers
        }
        const createdDepartment = await departmentTable.create(payload);
        res.status(200).json(createdDepartment);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
    },
    getAllDepartments: async (req, res)=>{
        try {
            const departments = await departmentTable.findAll();
            if(departments.length === 0){
                res.status(400).json({message: "No departments in database"});
            }
            else{
                res.status(200).json(departments);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server error"});
        }
    },
    getDepartmentById: async (req, res)=>{
        try {
            const department = await departmentTable.findByPk(req.params.id);
            if(!department){
                res.status(404).json({message: `No department with id ${req.params.id} found`});
            }
            else{
                res.status(200).json(department);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server error"});
        }
    },
    updateDepartment: async (req, res)=>{
        try {
            const department = await departmentTable.findByPk(req.params.id);
            //checked in middleware
            const {departmentName, maxMembers} = req.body;
            department.update({
                departmentName,
                maxMembers
            })
            res.status(200).json(department);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server error"});
        }
    },
    deleteDepartment: async (req, res)=>{
        try {
            const department = await departmentTable.findByPk(req.params.id);
            if(!department){
                res.status(404).json({message: `No department with id ${req.params.id} found`});
                return;
            }
            department.destroy(); //check return code?
            res.status(200).json({message: `Department with ID ${req.params.id} deleted`})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server error"});
        }
    }
};

module.exports = departmentController;