const {userTable, departmentTable} = require('../../models');
const {utils} = require('../../config');


//validate payload
//check if department full
//profile pic, department id can be null
//email has to be unique

const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
const nameRegex = /^[a-zA-Z-\s]+$/

const controller = {
    checkUserPayload: async (req, res, next) => {
        try {
            const users = await userTable.findAll();

            let errors = [];

            for(let key in req.body){
                if(typeof(req.body[key]) === 'string' && key != 'email' && key != 'password')
                    req.body[key] = utils.standardizeStr(req.body[key])
            }
    
            const payload = req.body;
            const {firstName, lastName, email, password, DepartmentId} = payload;
    
            if((firstName == null || email == null || lastName == null ||
                password == null) && req.method === 'POST'){
                errors.push("Every attribute except profilePicFile and DepartmentId mandatory for creating user");
            }
    
            if(DepartmentId != null){
                const department = await departmentTable.findByPk(DepartmentId);
                if(!department){
                    errors.push('Invalid department id provided');
                }
                else{
                    const noMembers = utils.getNoMembers(DepartmentId, users);
                    if(department.maxMembers === noMembers)
                        errors.push('Provided department is full');
                }
            }
            if(firstName != null){
                if(firstName.length < 2){
                    errors.push("First name must have at least 2 characters");
                }
                else if(!firstName.match(nameRegex)){
                    errors.push("First name can only contain alphabetical characters");
                }
            }
            if(lastName != null){
                if(lastName.length < 2){
                    errors.push("Last name must have at least 2 characters")
                }            
                else if(!lastName.match(nameRegex)){
                    errors.push("Last name can only contain alphabetical characters");
                }
            }
            if(email != null){
                if(email.length < 3){
                    errors.push("Email must have at least 3 characters");
                }
                else if(!email.match(emailRegex)){
                    errors.push("Please enter a valid email address");
                }
                else{
                    if(!utils.isUniqueValue(email, users, 'email')){
                        errors.push("Email not unique");
                    }
                }
            }
            if(errors.length === 0)
                next();
            else{
                const jsonMsg = {...errors};
                res.status(400).json({message: jsonMsg});
            }
        } catch (error) {
            res.status(500).json({message: 'Server error'});
            console.log(error);
        }

    }
};

module.exports = controller;