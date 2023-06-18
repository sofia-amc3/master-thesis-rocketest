import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

const OverviewTester = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const { userId, matchCriteria } = req.query;
      try {
        const result = await pool.query(
          // `SELECT DISTINCT T.ID,
          //                  T."name" AS "testName",
          //                  T."type" AS "testType",
          //                  T.DEADLINE AS "testDeadline",
          //                  U."name" AS "testCreator",
          //                  T.PAYMENT AS "testPayment"
          //   FROM "Tests" T
          //   LEFT JOIN "Users" U ON T."userId" = U.ID
          //   LEFT JOIN "Selection_Criteria" C ON C."testId" = T.ID
          //   LEFT JOIN "Testers" TT ON TT."userId" = ${userId}
          //   LEFT JOIN "Users" UTT ON TT."userId" = UTT.ID
          //   WHERE T."isPublic" = TRUE
          //     AND T."isDeleted" = FALSE
          //     AND T.DEADLINE > NOW()
          //     AND T.ID NOT IN
          //         (SELECT DISTINCT T.ID
          //           FROM "Tests" T,
          //                "Questions_Sections" Q,
          //                "Answers" A,
          //                "Testers" TT,
          //                "Users" U
          //           WHERE U.ID = T."userId"
          //             AND T.ID = Q."testId"
          //             AND Q.ID = A."questionId"
          //             AND A."userId" = TT."userId"
          //             AND TT."userId" = ${userId}
          //             AND T."isDeleted" = FALSE)
          //           ${
          //             matchCriteria === "true"
          //               ? `
          //                 AND date_part('year',age(TT."birthDate"))::integer <@ C."ageRange"
          //                 AND C."gender" = TT.gender
          //                 AND C."digitalSavviness" = TT."digitalSavviness"
          //                 AND C."hobbies" && TT.hobbies

          //                 AND C."location" = UTT.location
          //                 AND C."careers" @> ARRAY[UTT.career]`
          //               : ""
          //           }`

          `SELECT T.ID AS "testId",
                  T."name" AS "testName",
                  T."type" AS "testType",
                  T.DEADLINE AS "testDeadline",
                  U."name" AS "testCreator",
                  T.PAYMENT AS "testPayment",
                  (
                    (C."ageRange" @> DATE_PART('year', AGE(TT."birthDate"))::integer)::int + 
                    (C."gender" = TT.GENDER)::int + 
                    (C."digitalSavviness" @> ARRAY [TT."digitalSavviness"])::int + 
                    (C."hobbies" && TT.HOBBIES)::int + 
                    (C."location" = U."location")::int + 
                    (C."careers" @> ARRAY [U.CAREER])::int
                  ) AS "countOfMatches"
            FROM "Tests" T
                  LEFT JOIN "Users" U ON T."userId" = U.ID
                  LEFT JOIN "Selection_Criteria" C ON C."testId" = T.ID
                  LEFT JOIN "Testers" TT ON TT."userId" = ${userId}
                  LEFT JOIN "Users" UTT ON TT."userId" = UTT.ID
            WHERE T."isPublic" = TRUE
                  AND T."isDeleted" = FALSE
                  AND T.DEADLINE > NOW()
                  AND T.ID NOT IN (
                        SELECT DISTINCT T.ID
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
                              AND T."isDeleted" = FALSE
                  )
                  ${
                    matchCriteria === "true"
                      ? `
                      AND (
                            C."ageRange" @> DATE_PART('year', AGE(TT."birthDate"))::integer
                            OR C."gender" = TT.GENDER
                            OR C."digitalSavviness" @> ARRAY [TT."digitalSavviness"]
                            OR C."hobbies" && TT.HOBBIES
                            OR C."location" = U."location"
                            OR C."careers" @> ARRAY [U.CAREER]
                      )`
                      : ``
                  }
            ORDER BY "countOfMatches" DESC
          `
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

export default OverviewTester;
