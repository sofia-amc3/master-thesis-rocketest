import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

const registerUxRHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "POST":
      const {
        name,
        isCompany,
        email,
        password,
        jobTitle,
        location,
        website,
        description,
        profilePhoto,
      } = req.body;

      try {
        const result = await pool.query(
          `WITH tmpUsers AS (
              INSERT INTO "Users"
                     (email, password, name, career, location, type)
                     VALUES
                     ('${email}','${password}','${name}','${jobTitle}','${location}', 0)
                     RETURNING id)
                     INSERT INTO "UX_Researchers"
                            ("userId", "isCompany", website, description)
                            SELECT id, ${isCompany}, '${website}', '${description}'
                            FROM tmpUsers;`
        );

        const createdUser = await pool.query(
          `SELECT * FROM "Users" WHERE email = '${email}' AND password = '${password}';`
        );

        if (createdUser.rows.length === 1) {
          // Authentication successful
          return res.status(200).send(createdUser.rows[0]);
        } else {
          // Authentication failed
          throw "There was an error registering the user.";
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

export default registerUxRHandler;
