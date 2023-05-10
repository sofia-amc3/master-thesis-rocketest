import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

const setNewPasswordHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;

      // Checks if field was fulfilled
      if (!password)
        return res.status(400).send("Password fields cannot be empty.");

      try {
        const result = await pool.query(
          // verify if user exists
          `SELECT * FROM "Users" WHERE email = '${email}';`
        );

        if (result.rows.length === 1) {
          // user exists
          await pool.query(
            // update password
            `UPDATE public."Users"
            SET password='${password}'
            WHERE email = '${email}';`
          );

          const updatedUser = await pool.query(
            // verify if password was updated
            `SELECT * FROM "Users" WHERE email = '${email}' AND password = '${password}';`
          );

          if (updatedUser.rows.length === 1) {
            // update successful
            return res.status(200).send(updatedUser.rows[0]);
          } else {
            // update failed
            throw "There was an error updating the user's password.";
          }
        } else {
          return res.status(400).send("Invalid E-mail."); // The e-mail does not exist
        }
      } catch (error) {
        return res.status(400).send(error);
      }
      break;

    default:
      return res.status(500).send("There was a problem with the connection.");
      break;
  }
};

export default setNewPasswordHandler;
