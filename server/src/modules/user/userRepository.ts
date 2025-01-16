import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
  created_at: number;
  updated_at: number;
  role_id: number;
};

class UserRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");
    return rows as UserType[];
  }

  async create(
    user: Omit<UserType, "id" | "role_id">,
    // omit construit un type en supprimant certaines propriétés de UserType : id, created_at, update_at, role_id
  ) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO 
      user (firstname, lastname, email, password, avatar, created_at, updated_at, role_id)
      VALUES (?, ?, ?, ?, "", NOW(), NOW(), 1) `,
      [user.firstname, user.lastname, user.email, user.password],
    );
    return result.insertId;
  }

  async findEmail(userEmail: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email= ?",
      [userEmail],
    );
  }
}

export default new UserRepository();
