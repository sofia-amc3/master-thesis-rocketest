import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

const MyTestsUXResearcherHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET":
      const { userId } = req.query;
      try {
        const result = await pool.query(
          `SELECT T.ID,
                 T."name" as "testName",
                 T."type" as "testType",
                 DEADLINE as "testDeadline"
          FROM PUBLIC."Tests" T
          WHERE T."userId" = ${userId}`
        );
        return res.status(200).send(result.rows);
      } catch (error) {
        return res.status(400).send(error);
      }
      break;

    default:
      return res.status(500).send("There was a problem with the connection.");
      break;
  }
};

export default MyTestsUXResearcherHandler;
