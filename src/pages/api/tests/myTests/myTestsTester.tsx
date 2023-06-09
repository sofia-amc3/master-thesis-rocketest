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
      return res.status(500).send("There was a problem with the connection.");
      break;
  }
};

export default MyTestsTesterHandler;
