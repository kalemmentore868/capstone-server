import db from "../config/db";

export interface CategoryType {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

class CategoryModel {
  static async createCategory(category: CategoryType) {
    const results = await db.query(
      `INSERT INTO categories (title, description, thumbnail) VALUES('${category.title}','${category.description}','${category.thumbnail}') RETURNING *`
    );
    return results.rows[0];
  }
  static async getAllCategories() {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      "SELECT id, title, description, thumbnail FROM categories;"
    );

    return results.rows;
  }

  static async getCategory(id: number) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id,title, description, thumbnail FROM categories WHERE id = ${id}`
    );
    return results.rows[0];
  }

  static async getCategoryByTitle(title: string) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id,title, description, thumbnail FROM categories WHERE title = '${title}'`
    );
    return results.rows[0];
  }

  static async deleteCategory(id: number) {
    await db.query(`DELETE FROM categories WHERE id = '${id}'`);
  }

  static async updateCategory(category_form_data: CategoryType, id: number) {
    const results = await db.query(
      `UPDATE categories SET title ='${category_form_data.title}',
          description='${category_form_data.description}',
          thumbnail='${category_form_data.thumbnail}'
          WHERE id=${id}
          RETURNING *;`
    );
    return results.rows[0];
  }

  static async deleteAllCategories() {
    await db.query("DELETE FROM categories");
  }
}
export default CategoryModel;
