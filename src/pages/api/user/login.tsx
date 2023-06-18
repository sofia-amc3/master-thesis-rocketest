import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

const logInHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;

      // Checks if both fields were fulfilled
      if (!email || !password)
        return res
          .status(400)
          .send({ message: "Please provide both e-mail and password." });

      try {
        const result = await pool.query(
          `SELECT * FROM "Users" WHERE email = '${email}';`
        );

        if (result.rows.length === 1) {
          const user = result.rows[0];

          if (user.password === password)
            return res.status(200).send(user); // Login successful
          else return res.status(400).send({ message: "Incorrect Password." }); // The password does not match the one in the database
        } else {
          return res.status(400).send({ message: "Invalid E-mail." }); // The e-mail does not exist
        }
      } catch (error) {
        return res.status(400).send(error);
      }
      break;

    default:
      return res
        .status(500)
        .send({ message: "There was a problem with the connection." });
      break;
  }
};

export default logInHandler;
