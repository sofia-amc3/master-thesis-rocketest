import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

interface testDetailsQuery {
  testId: number;
  testName: string;
  testType: string;
  testDeadline: Date;
  testersCount: number;
  testPayment: number;
  testerId: number;
  testerName: string;
  testerCareer: string;
  testerLocation: string;
  testerProfilePic: string;
}

interface testDetailsResponse {
  testId: number;
  testName: string;
  testType: string;
  testDeadline: Date;
  testersCount: number;
  testPayment: number;
  testersAns: {
    testerId: number;
    testerName: string;
    testerCareer: string;
    testerLocation: string;
    testerProfilePic: string;
  }[];
}

const TestDetailUXResearcherHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET":
      const { userId, testId } = req.query;
      try {
        const result = await pool.query(
          // `SELECT T.ID,
          //         T."name" AS "testName",
          //         T."type" AS "testType",
          //         DEADLINE AS "testDeadline",
          //         COUNT(C.ID) AS "testersCount",
          //         T.PAYMENT AS "testPayment"
          //   FROM PUBLIC."Tests" T
          //   LEFT JOIN PUBLIC."Contacted_Users" C ON C."testId" = T.ID
          //   WHERE T."userId" = ${userId}
          //         AND T.ID = ${testId}
          //         AND T."isDeleted" = FALSE
          //   GROUP BY T.ID`

          `
          SELECT DISTINCT *
          FROM
            (SELECT T.ID AS "testId",
                    T."name" AS "testName",
                    T."type" AS "testType",
                    DEADLINE AS "testDeadline",
                    COUNT(C.ID) AS "testersCount",
                    T.PAYMENT AS "testPayment"
              FROM PUBLIC."Tests" T
              LEFT JOIN PUBLIC."Contacted_Users" C ON C."testId" = T.ID
              WHERE T."userId" = ${userId}
                AND T.ID = ${testId}
                AND T."isDeleted" = FALSE
              GROUP BY T.ID) TEMP1
          LEFT JOIN
            (SELECT DISTINCT T.ID AS "testId",
                             U.ID AS "testerId",
                             U."name" AS "testerName",
                             U.CAREER AS "testerCareer",
                             U."location" AS "testerLocation",
                             U."profilePhoto" AS "testerProfilePic"
              FROM PUBLIC."Tests" T,
                   PUBLIC."Questions_Sections" Q_S,
                   PUBLIC."Answers" ANS,
                   PUBLIC."Users" U
              WHERE Q_S."testId" = T.ID
                AND ANS."questionId" = Q_S.ID
                AND U.ID = ANS."userId"
                AND T."userId" = ${userId}
                AND T.ID = ${testId}
                AND T."isDeleted" = FALSE ) TEMP2 ON TEMP1."testId" = TEMP2."testId";
          `
        );

        if (result.rows.length > 0) {
          const list = result.rows as testDetailsQuery[];
          const response = {
            testId: list[0].testId,
            testName: list[0].testName,
            testType: list[0].testType,
            testDeadline: list[0].testDeadline,
            testersCount: list[0].testersCount,
            testPayment: list[0].testPayment,
            testersAns: [],
          } as testDetailsResponse;

          list.forEach((tester) => {
            if (tester.testId) {
              response.testersAns.push({
                testerId: tester.testerId,
                testerName: tester.testerName,
                testerCareer: tester.testerCareer,
                testerLocation: tester.testerLocation,
                testerProfilePic: tester.testerProfilePic,
              });
            }
          });

          return res.status(200).send(response);
        }
        return res.status(400).send("Unable to get test information");
      } catch (error) {
        return res.status(400).send(error);
      }
      break;

    default:
      return res.status(500).send("There was a problem with the connection.");
      break;
  }
};

export default TestDetailUXResearcherHandler;
