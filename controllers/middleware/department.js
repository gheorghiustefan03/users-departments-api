const {utils} = require('../../config');
const {departmentTable, userTable} = require('../../models');

const controller = {
    checkDepartmentPayload: async (req, res, next)=>{
        try {
            let errors = [];

            for(let key in req.body){
                if(typeof(req.body[key]) === 'string')
                    req.body[key] = utils.standardizeStr(req.body[key])
            }

            const {departmentName, maxMembers} = req.body;

            if((departmentName == null || maxMembers == null) && req.method === 'POST'){
                errors.push('Values for department name and max members cannot be empty');
            }
            if(departmentName != null){
                if(departmentName.length < 2){
                    errors.push('The department name must have at least two characters');
                }
                const departments = await departmentTable.findAll();
                if(!utils.isUniqueValue(departmentName, departments, 'departmentName')){
                    errors.push('Provided department name not unique');
                }
            }
            if(maxMembers != null){
                if(maxMembers <= 0){
                    errors.push('Max members value must be larger than 0');
                }
            }

            if(errors.length === 0){
                next();
            }
            else{
                const jsonMsg = {...errors};
                res.status(400).json({message: jsonMsg});
            }
        } catch (error) {
            res.status(500).json({message: "Server error"});
        }
    },
    checkMaxMembers: async (req, res, next) => {
        try {
            const department = await departmentTable.findByPk(req.params.id);
            const users = await userTable.findAll();
            if(!department){
                res.status(404).json({message: `No department with ID ${req.params.id} found`});
                return;
            }
            const noMembers = utils.getNoMembers(req.params.id, users);
            if(noMembers > req.body.maxMembers){
                res.status(400).json({message: `Cannot change value of maxMembers to one larger than actual nr. of members in db (${noMembers})`})
            }
            else{
                next();
            }
        } catch (error) {
            res.status(500).json({message: "Server error"});
        }

    }
};

module.exports = controller;