const {db} = require('../config');
const userModel = require('./user');
const departmentModel = require('./department');


const userTable = userModel(db);
const departmentTable = departmentModel(db);
    
departmentTable.hasMany(userTable);
userTable.belongsTo(departmentTable);

module.exports = {
    userTable,
    departmentTable
}