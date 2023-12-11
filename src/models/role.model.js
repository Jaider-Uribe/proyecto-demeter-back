import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { user } from './user.model.js'
import { modulePermission } from "./modulePermission.model.js";

export const role = sequelize.define('Roles', {

    ID_Role: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Name_Role: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre es requerido"
            },
            customValidate(value) {
                if (!/^[A-ZÑñ][a-zA-ZÑñ\s]*$/.test(value)) {
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras, espacios y la letra "ñ".');
                }
            }
        }
    },

    State: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El estado es requerido'
            }
        }
    }
}, {
    timestamps: false
});

role.hasMany(user, {
    foreignKey: 'Role_ID',
    sourceKey: 'ID_Role'
})

user.belongsTo(role, {
    foreignKey: 'Role_ID',
    targetKey: 'ID_Role'
})

role.hasMany(modulePermission, {
    foreignKey: 'Role_ID',
    sourceKey: 'ID_Role'
})

modulePermission.belongsTo(role, {
    foreignKey: 'Role_ID',
    targetKey: 'ID_Role'
})