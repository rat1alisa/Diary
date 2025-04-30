import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../shared/db/sequelize';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const User = sequelize.define<Model<UserAttributes>>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});