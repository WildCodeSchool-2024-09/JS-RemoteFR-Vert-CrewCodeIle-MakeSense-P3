import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Country = {
  id: number;
  label: string;
};

//CREATE country
class CountryRepository {
  async create(country: Omit<Country, "id">) {
    const [result] = await DatabaseClient.query<Result>(
      " INSERT INTO country (label) VALUES (?);",
      [country.label],
    );
    return result.insertId;
  }

  //READ & READ ALL country
  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM country WHERE id = ?",
      [id],
    );
    return rows[0] as Country;
  }

  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("SELECT * FROM country");
    return rows as Country[];
  }

  //UPDATE country
  async update(country: Country) {
    const [result] = await DatabaseClient.query<Result>(
      "UPDATE country SET label = ? WHERE id = ?",
      [country.label, country.id],
    );
    return result.affectedRows;
  }

  //DELETE country
  async delete(id: number) {
    const [result] = await DatabaseClient.query<Result>(
      "DELETE FROM country WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new CountryRepository();
