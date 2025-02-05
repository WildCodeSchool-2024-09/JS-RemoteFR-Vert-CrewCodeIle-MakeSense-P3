import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class UserRepository {
  async create(user: NewUserType) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname, email, hash_password, avatar, country_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hash_password,
        user.avatar,
        user.country_id,
      ],
    );
    return [result];
  }

  async checkUniqueEmail(userEmail: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email= ?",
      [userEmail],
    );
    return rows as UserType[];
  }

  async readByEmail(email: string): Promise<UserType | null> {
    const [user] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );

    const result = user as UserType[];
    return result.length > 0 ? result[0] : null;
  }
}

export default new UserRepository();
