import * as Sequelize from "sequelize";
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface UserAttributes {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {

  const User: UserModel = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    photo: {
      type: DataTypes.BLOB({
        length: 'long'
      }),
      allowNull: true,
      defaultValue: null
    }
  },
  {
    tableName: 'users',
    hooks: {
      beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
        const salt = genSaltSync();
        user.password = hashSync(user.password, salt);
      }
    }
  });

  User.prototype.isPassword = (encodedPassword: string, password: string) => {
    return compareSync(password, encodedPassword);
  }

  User.associate = (models: ModelsInterface): void => {};
  return User;
}
