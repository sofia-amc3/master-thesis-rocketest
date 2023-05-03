import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

const logInHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;

      try {
        const result = await pool.query(
          `SELECT * FROM "Users" WHERE email = '${email}' AND password = '${password}';`
        );

        if (result.rows.length === 1) {
          // Login successful
          return res.status(200).send(result.rows[0]);
        } else {
          // Login failed
          throw "There was an error on login.";
        }
      } catch (error) {
        console.log(error);
        return res.status(400).send(error);
      }
      break;

    default:
      return res.status(500).send("There was a problem with the connection.");
      break;
  }
};

export default logInHandler;
