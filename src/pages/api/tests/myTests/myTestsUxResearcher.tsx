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
          // Query Explanation: retrieves test's information created by a specific user
          // it uses a LEFT JOIN to ensure that all tests are included in the result, regardless of whether they have associated contacted users
          `SELECT T.ID as "testId",
                  T."name" AS "testName",
                  T."type" AS "testType",
                  DEADLINE AS "testDeadline",
                  COUNT(C.ID) AS "testersCount"
            FROM PUBLIC."Tests" T
            LEFT JOIN PUBLIC."Contacted_Users" C ON C."testId" = T.ID
            WHERE T."userId" = ${userId}
                  AND T."isDeleted" = FALSE
            GROUP BY T.ID`
        );
        return res.status(200).send(result.rows);
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

export default MyTestsUXResearcherHandler;
