import { Review } from "../entities/review/model/Reviews";
import { User } from "../entities/user/model/Users";


export const initModels = () => {
  // Здесь настраиваем связи между моделями, если нужно

  User.hasMany(Review, { foreignKey: 'user_id' });
  Review.belongsTo(User, { foreignKey: 'user_id' });

  return {
    Review,
    User,
  };
};