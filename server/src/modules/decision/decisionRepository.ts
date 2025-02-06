import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Decision = {
  title: string;
  firstname: string;
  lastname: string;
  category: string;
  country: string;
};

class DecisionRepository {
  async readAllDecisions() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT decision.*, user.firstname, user.lastname, country.label AS country FROM decision 
      INNER JOIN country ON country.id = decision.country_id 
      INNER JOIN user ON user.id = decision.user_id
      `,
    );
    return rows as Decision[];
  }

  async readArchivedDecisions() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT decision.*, user.firstname, user.lastname, country.label  AS country FROM decision 
      INNER JOIN country ON country.id = decision.country_id 
      INNER JOIN user ON user.id = decision.user_id
      WHERE decision.step="approved" OR decision.step="rejected"
      `,
    );
    return rows as Decision[];
  }

  async readMyDecisions(user_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT decision.*, user.firstname, user.lastname, user.avatar, country.label  AS country FROM decision 
      INNER JOIN country ON country.id = decision.country_id 
      INNER JOIN user ON user.id = decision.user_id
      WHERE user_id=?
      `,
      [user_id],
    );
    return rows as Decision[];
  }

  async readParticipatingDecisions(user_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT decision.*, user.firstname, user.lastname, user.avatar, country.label AS country FROM decision
      INNER JOIN country ON country.id = decision.country_id
      INNER JOIN user ON user.country_id = decision.country_id
      WHERE decision.step="in progress" AND user.id =?
      `,
      [user_id],
    );
    return rows as Decision[];
  }

  async readRunningDecisions() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT decision.*, user.firstname, user.lastname, user.avatar, country.label  AS country FROM decision 
      INNER JOIN country ON country.id = decision.country_id 
      INNER JOIN user ON user.id = decision.user_id
      WHERE decision.step="in progress"
      `,
    );
    return rows as Decision[];
  }

  async read(decisionId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
      decision.title, decision.min_date, decision.max_date, decision.description, decision.context, decision.profit, decision.risk, decision.step, user.avatar,
      country.label AS country, 
      user.lastname, user.firstname
      FROM decision 
      INNER JOIN country ON country.id = decision.country_id 
      INNER JOIN user ON user.id = decision.user_id 
      WHERE decision.id=?`,
      [decisionId],
    );
    return rows[0];
  }
}

export default new DecisionRepository();
