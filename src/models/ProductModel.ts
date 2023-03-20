import db from "../config/db";

export interface ProductType {
  id: number;
  title: string;
  description: string;
  category_id: number;
  rating: number;
  is_best_seller: boolean;
  img_url: string;
  seller_id: number;
  price: number;
  created_at: Date;
}

class ProductModel {
  static async createProduct(product: ProductType) {
    const results = await db.query(
      `INSERT INTO products (title, description, category_id, rating, is_best_seller, img_url, price, seller_id) VALUES('${product.title}','${product.description}','${product.category_id}', '${product.rating}', '${product.is_best_seller}', '${product.img_url}', '${product.price}', '${product.seller_id}') RETURNING *`
    );
    return results.rows[0];
  }

  static async getAllProducts() {
    // ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      "SELECT id, title, description, category_id, rating, is_best_seller, img_url, price, seller_id FROM products;"
    );

    return results.rows;
  }

  static async getProduct(id: number) {
    // ALWAYS RETURN 0 or 1
    // db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id, title, description, category_id, rating, is_best_seller, img_url, price, seller_id FROM products WHERE id = ${id}`
    );
    return results.rows[0];
  }

  static async deleteProduct(id: number) {
    await db.query(`DELETE FROM products WHERE id = '${id}'`);
  }

  static async updateProduct(product_form_data: ProductType, id: number) {
    const results = await db.query(
      `UPDATE products SET title ='${product_form_data.title}',
          description='${product_form_data.description}',
          category_id='${product_form_data.category_id}',
          rating='${product_form_data.rating}',
          is_best_seller='${product_form_data.is_best_seller}',
          img_url='${product_form_data.img_url}',
          price='${product_form_data.price}',
          seller_id='${product_form_data.seller_id}'
          WHERE id=${id}
          RETURNING *;`
    );
    return results.rows[0];
  }
}

export default ProductModel;
