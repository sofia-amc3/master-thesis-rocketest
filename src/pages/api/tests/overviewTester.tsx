import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

const OverviewTester = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const { userId, matchCriteria } = req.query;
      try {
        const result = await pool.query(
          `SELECT T.ID,
                    T."name" AS "testName",
                    T."type" AS "testType",
                    T.DEADLINE AS "testDeadline",
                    U."name" AS "testCreator",
                    T.PAYMENT AS "testPayment"
              FROM "Tests" T
              LEFT JOIN "Users" U ON T."userId" = U.ID
              LEFT JOIN "Selection_Criteria" C ON C."testId" = T.ID
              LEFT JOIN "Testers" TT ON TT."userId" = ${userId}
              LEFT JOIN "Users" UTT ON TT."userId" = UTT.ID
              WHERE T."isPublic" = TRUE
                    AND T."isDeleted" = FALSE
                    ${
                      matchCriteria === "true"
                        ? `
                          AND date_part('year',age(TT."birthDate"))::integer <@ C."ageRange"
                          AND C."gender" = TT.gender
                          AND C."digitalSavviness" = TT."digitalSavviness"
                          AND C."hobbies" && TT.hobbies
                          
                          AND C."location" = UTT.location
                          AND C."careers" @> ARRAY[UTT.career]`
                        : ""
                    }`
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

export default OverviewTester;
