import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

export interface ContactedUserData {
  userId: number | string;
  platform: string;
}

const ContactedUsersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "POST":
      const { testId, userData } = req.body;
      const _data = userData as ContactedUserData[];

      try {
        let queryBuild: string;
        if (_data[0].platform === "Rocketest") {
          // if the platform is Rocketest we are inserting users with an internal ID
          queryBuild = `INSERT INTO public."Contacted_Users"("internalUserId", "testId", platform)
                          VALUES `;

          _data.forEach((user) => {
            queryBuild += `(${user.userId}, ${testId}, '${user.platform}'), `;
          });
        } else {
          // if not, we are inserting users with an external ID
          queryBuild = `INSERT INTO public."Contacted_Users"("externalUserId", "testId", platform)
                          VALUES `;

          _data.forEach((user) => {
            queryBuild += `('${user.userId}', ${testId}, '${user.platform}'), `;
          });
        }

        // execute the query by removing the trailing comma and semicolon
        const result = await pool.query(
          queryBuild.substring(0, queryBuild.length - 2) + ";"
        );

        if (result.rowCount > 0) {
          return res.status(200).send("Users were contacted successfully.");
        }
        return res.status(400).send({
          message: "There was an error registering the contacted users.",
        });
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

export default ContactedUsersHandler;
