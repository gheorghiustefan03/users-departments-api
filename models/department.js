const {DataTypes} = require('sequelize');

const departmentModel = (db)=>{
    const model = db.define('Department', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        departmentName:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        maxMembers:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {freezeTableName: true});
    return model;
};

module.exports = departmentModel;