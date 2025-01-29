import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  label: string;
  color: string;
};
class CategoryRepository {
  async create(category: Omit<Category, "id">) {
    const [result] = await DatabaseClient.query<Result>(
      "INSERT INTO category (label, color) VALUES (?, ?);",
      [category.label, category.color],
    );

    return result.insertId;
  }

  async findIfCategoryLabelAlreadyExist(label: string): Promise<boolean> {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT id FROM category WHERE label = ?",
      [label],
    );

    return rows.length > 0;
  }

  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT category.label, category.color FROM category WHERE category.id = ?",
      [id],
    );

    return rows[0] as Category;
  }

  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("SELECT * FROM category");

    return rows as Category[];
  }

  async update(category: Category) {
    const [result] = await DatabaseClient.query<Result>(
      "UPDATE category SET label = ?, color = ? WHERE id = ?",
      [category.label, category.color, category.id],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await DatabaseClient.query<Result>(
      "DELETE FROM category WHERE id = ?",
      [id],
    );

    return result.affectedRows;
  }
}
export default new CategoryRepository();
