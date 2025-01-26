import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Role = {
  id: number;
  label: string;
};

//CREATE role
class RoleRepository {
  async create(role: Omit<Role, "id">) {
    const [result] = await DatabaseClient.query<Result>(
      " INSERT INTO role (label) VALUES (?)",
      [role.label],
    );
    return result.insertId;
  }

  //READ & READ ALL role
  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM role WHERE id = ?",
      [id],
    );
    return rows[0] as Role;
  }

  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("SELECT * FROM role");
    return rows as Role[];
  }

  //Pas UPDATE Role X

  //DELETE role
  async delete(id: number) {
    const [result] = await DatabaseClient.query<Result>(
      "DELETE FROM role WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new RoleRepository();
