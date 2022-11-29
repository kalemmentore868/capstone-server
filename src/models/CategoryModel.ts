import db from "../config/db";

export interface CategoryInterface {
  id?: number;
  title: string;
  img_url: string;
  description: string;
}

class Category {
  static async createCategory(category: CategoryInterface) {
    const results = await db.query(
      `INSERT INTO categories (title, img_url, description) VALUES('${category.title}','${category.img_url}','${category.description}' ) RETURNING *`
    );
    return results.rows[0];
  }
  static async getAllCategories() {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      "SELECT id, title, img_url,description, date_created FROM categories;"
    );

    return results.rows;
  }

  static async getCategory(id: number) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id,title, img_url,description, date_created FROM categories WHERE id = ${id}`
    );
    return results.rows[0];
  }

  static async deleteCategory(id: number) {
    await db.query(`DELETE FROM categories WHERE id = ${id}`);
  }

  static async updateCategory(category: CategoryInterface, id: number) {
    const results = await db.query(
      `UPDATE property SET title ='${category.title}',
          img_url='${category.img_url}',
          description='${category.description}'
          WHERE id=${id} RETURNING *;`
    );
    return results.rows[0];
  }
}

export default Category;
