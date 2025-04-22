import { DataTypes } from 'sequelize';
import { sequelize } from '../shared/db/sequelize';

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'products',
  timestamps: false,
});