// import { Review } from "../../../models/Reviews"; // не правильно указан путь к файлу(модели Reviews)

import { Review } from "../model/Reviews"; // - правильный путь к файлу

export const reviewService = {
  async getAll() {
    return await Review.findAll();
  },

  async getById(id: number) {
    return await Review.findByPk(id);
  },

  async create(data: any) {
    return await Review.create(data);
  },

  async update(id: number, data: any) {
    return await Review.update(data, { where: { id } });
  },

  async remove(id: number) {
    return await Review.destroy({ where: { id } });
  },
};