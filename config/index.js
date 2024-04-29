const db = require('./db');
const fs = require('fs');

const resetDb = async (req, res)=>{
    try {
        await db.sync({force: true});
        fs.readdir(__dirname + '\\..\\profile_pics\\', (err, files) => {
            if(err) throw err;

            for(const file of files){
                if(file !== '.gitkeep')
                    fs.unlink(__dirname + '\\..\\profile_pics\\' + file, err => {
                if(err) throw err;
                });
            }
        })
        res.status(200).json({message: "Database reset"});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}
const utils = {
    //removes leading and trailing whitespace, capitalizes the string
    standardizeStr: (input)=>{
        const trimmedStr = input.trim();
        return trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1);
    },
    //checks if valueToCheck is unique in an array of objects (objArray)
    //only checks against value objArray[objKey] for each object
    //returns true if unique, false if not
    isUniqueValue: (valueToCheck, objArray, objKey)=>{
        for(const obj of objArray){
            if(typeof(valueToCheck) === 'string'){
                if(valueToCheck.toLowerCase() === (obj[objKey]).toLowerCase()){
                    return false;
                }
            }
            else{
                if(valueToCheck === obj[objKey]){
                    return false;
                }
            }
        }
    
        return true;
    },
    getNoMembers: (departmentId, users) => {
        let noMembers = 0;
        for(const user of users){
            if(user.DepartmentId === departmentId){
                noMembers += 1;
            }
        }
        return noMembers;
    }
}

module.exports = {db, resetDb, utils};