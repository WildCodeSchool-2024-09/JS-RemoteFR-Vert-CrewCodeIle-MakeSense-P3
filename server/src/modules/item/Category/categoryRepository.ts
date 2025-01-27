import DatabaseClient from "../../../../database/client";
import type { Result, Rows } from "../../../../database/client";
//Create Read Update Delete

type Category = {
  id: number;
  label: string;
};
class CategoryRepository {
  //omit sert à ne pas prendre en compte un des champs, l'id est en autoincrement, ici on evite les conflits en ne le recupérant pas
  async create(category: Omit<Category, "id">) {
    // Execute the SQL SELECT query to retrieve all tiles from the "tile" table

    const [result] = await DatabaseClient.query<Result>(
      " INSERT INTO category (label) VALUES (?);",
      [category.label],
    );

    // Return the array of tiles
    return result.insertId;
    //as unknown as Category[]; //pourquoi je dois typer comme cela ????
    // return (result as any).insertId;
    //category[]; // ROMAIN: pourquoi ce n'est pas comme le as tile[] ?
  }

  async findIfCategoryLabelAlreadyExist(label: string): Promise<boolean> {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT id FROM category WHERE label = ?",
      [label],
    );

    // Return thrue si la category existe, la ligne corresponsant au label est >0:
    return rows.length > 0;
  }

  // async read(id: number) {
  //   // Execute the SQL SELECT query to retrieve a specific category by its ID
  //   const [rows] = await DatabaseClient.query<Rows>(
  //     "SELECT * FROM category WHERE id = ?",
  //     [id],
  //   );

  //   // Return the first row of the result, which represents the category
  //   return rows[0] as Category;
  // }

  //   async readAll() {
  //     // Execute the SQL SELECT query to retrieve all categories from the "category" table
  //     const [rows] = await DatabaseClient.query<Rows>("SELECT * FROM category");

  //     // Return the array of categories
  //     return rows as Category[];
  //   }

  //   async update(category: Category) {
  //     // Execute the SQL UPDATE query to update an existing category in the "category" table
  //     const [result] = await DatabaseClient.query<Result>(
  //       "UPDATE category SET label = ? WHERE id = ?",
  //       [category.label, category.id],
  //     );

  //     // Return how many rows were affected
  //     return result.affectedRows;
  //   }

  //   async delete(id: number) {
  //     // Execute the SQL DELETE query to delete an existing category from the "category" table
  //     const [result] = await DatabaseClient.query<Result>(
  //       "DELETE FROM category WHERE id = ?",
  //       [id],
  //     );

  //     // Return how many rows were affected
  //     return result.affectedRows;
  //   }
  // }
}
export default new CategoryRepository();
