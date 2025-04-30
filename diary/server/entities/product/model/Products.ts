import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../shared/db/sequelize';

export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const Product = sequelize.define<Model<ProductData>>('Product', {
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