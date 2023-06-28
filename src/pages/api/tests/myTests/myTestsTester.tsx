import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

const MyTestsTesterHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET":
      const { userId } = req.query;
      try {
        const result = await pool.query(
          // Query Explanation: retrieves test's information based on the provided user ID value
          // -
          // WHERE clause:
          // U.ID = T."userId" -> matches the user ID from the "Users" table with the "userId" column in the "Tests" table, representing the TEST CREATOR (UX Researcher)
          // T.ID = Q."testId" -> matches the test ID from the "Tests" table with the "testId" column in the "Questions_Sections" table
          // Q.ID = A."questionId" -> matches the question ID from the "Questions_Sections" table with the "questionId" column in the "Answers" table
          // A."userId" = TT."userId" -> matches the user ID from the "Answers" table with the "userId" column in the "Testers" table, representing the TESTER
          // TT."userId" = ${userId} -> matches the tester's user ID with the provided userId value
          // T."isDeleted" = FALSE -> ensures that the tests shown have not been deleted
          `SELECT DISTINCT T.ID AS "testId",
                           T."name" AS "testName",
                           T."type" AS "testType",
                           T.DEADLINE AS "testDeadline",
                           U."name" AS "testCreator",
                           T.PAYMENT AS "testPayment"
            FROM "Tests" T,
                 "Questions_Sections" Q,
                 "Answers" A,
                 "Testers" TT,
                 "Users" U
            WHERE U.ID = T."userId"
              AND T.ID = Q."testId"
              AND Q.ID = A."questionId"
              AND A."userId" = TT."userId"
              AND TT."userId" = ${userId}
              AND T."isDeleted" = FALSE;`
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

export default MyTestsTesterHandler;
