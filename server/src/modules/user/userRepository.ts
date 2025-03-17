import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class UserRepository {
  async create(user: UserType) {
    console.info("tentative d'inservtion user ", user);
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname, email, hashed_password, avatar, country_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashed_password,
        user.avatar,
        user.country_id,
      ],
    );
    console.info("utilisateur insere", result);
    return [result];
  }
  async readByEmailWithPassword(email: string) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await databaseClient.query<Rows>(
      "select id, firstname, lastname, email, hashed_password, avatar, country_id, role_id from user where email = ?",
      [email],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as UserType; //je renvois un object ou null une ligne de mon tableau
  }
  // async retrieveCredentialsByEmail(email: string) {
  //   //recupérer un user grâce à son email
  //   // Execute the SQL SELECT query to retrieve a specific user by its email
  //   const [rows] = await databaseClient.query<Rows>(
  //     "select email, hashed_password from user where email = ?",
  //     [email],
  //   );

  //   // Return the first row of the result, which represents the user
  //   return rows[0] as UserType; //je renvois un object ou null une ligne de mon tableau
  // }
  async read(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT user.country_id AS country_id FROM user
      WHERE user.id=?`,
      [userId],
    );
    return rows[0]; //renvoit un element -_> object user un element du tableau
  }
  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await databaseClient.query<Rows>("select * from user");

    // Return the array of users
    return rows as UserType[]; //renvoit toutes les lignes --> tableau
  }
}

export default new UserRepository();
