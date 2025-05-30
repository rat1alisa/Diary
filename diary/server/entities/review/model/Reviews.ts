
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../shared/db/sequelize';
import { User } from '../../user/model/Users';


export interface ReviewData {
  id: number;
  user_id: number;
  name: string;
  description: string;
  value: number;
}

export const Review = sequelize.define<Model<ReviewData>>('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'reviews',
  timestamps: false,
});

// Связь: один пользователь может иметь много отзывов
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });