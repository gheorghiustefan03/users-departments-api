const {DataTypes} = require('sequelize');

const UserModel = (db)=>{
    const model = db.define('User', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        profilePicFile:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {freezeTableName: true});
    return model;
};

module.exports = UserModel;