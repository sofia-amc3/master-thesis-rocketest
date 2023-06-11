import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

export interface TesterAnsData {
  testerId: number;
  testerName: string;
  withinGender: boolean;
  testerGender: string;
  withinAge: boolean;
  testerAge: number;
  withinLocation: boolean;
  testerLocation: string;
  withinCareer: boolean;
  testerCareer: string;
  withinHobbies: boolean;
  sameHobbies: string[];
  withinDigiSav: boolean;
  testerDigiSav: number;
  testerProfilePic: string;
}

interface testDetailsQuery extends TesterAnsData {
  testId: number;
  testName: string;
  testType: string;
  testDeadline: Date;
  testersCount: number;
  testPayment: number;
}

interface testDetailsResponse {
  testId: number;
  testName: string;
  testType: string;
  testDeadline: Date;
  testersCount: number;
  testPayment: number;
  testersAns: TesterAnsData[];
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
          `
          SELECT DISTINCT TEMP1."testId",
                          TEMP1."testName",
                          TEMP1."testType",
                          TEMP1."testDeadline",
                          TEMP1."testersCount",
                          TEMP1."testPayment",
                          TEMP2."testerId",
                          TEMP2."testerName",
                          TEMP1."criteriaGender" = TEMP2."testerGender" AS "withinGender",
                          TEMP2."testerGender",
                          TEMP1."criteriaAge" @> TEMP2."testerAge" AS "withinAge",
                          TEMP2."testerAge",
                          TEMP1."criteriaLocation" = TEMP2."testerLocation" AS "withinLocation",
                          TEMP2."testerLocation",
                          TEMP1."criteriaCareers" @> ARRAY[TEMP2."testerCareer"] AS "withinCareer",
                          TEMP2."testerCareer",
                          TEMP1."criteriaHobbies" && TEMP2."testerHobbies" AS "withinHobbies",
                          ARRAY (
                                  SELECT UNNEST(TEMP1."criteriaHobbies")
                                  INTERSECT
                                  SELECT UNNEST(TEMP2."testerHobbies")
                                ) AS "sameHobbies",
                          TEMP1."criteriaDigiSav" @> ARRAY[TEMP2."testerDigiSav"] AS "withinDigiSav",
                          TEMP2."testerDigiSav",
                          TEMP2."testerProfilePic"
          FROM
            (SELECT T.ID AS "testId",
                T."name" AS "testName",
                T."type" AS "testType",
                DEADLINE AS "testDeadline",
                COUNT(C.ID) AS "testersCount",
                T.PAYMENT AS "testPayment",
                SelC."ageRange" AS "criteriaAge",
                SelC."gender" AS "criteriaGender",
                SelC."digitalSavviness" AS "criteriaDigiSav",
                SelC."hobbies" AS "criteriaHobbies",
                SelC."location" AS "criteriaLocation",
                SelC."careers" AS "criteriaCareers"
              FROM PUBLIC."Tests" T
              INNER JOIN PUBLIC."Selection_Criteria" SelC ON T.ID = SelC."testId"
              LEFT JOIN PUBLIC."Contacted_Users" C ON C."testId" = T.ID
              WHERE T."userId" = ${userId}
                AND T.ID = ${testId}
                AND T."isDeleted" = FALSE
              GROUP BY T.ID, SelC."testId") TEMP1
          LEFT JOIN
            (SELECT DISTINCT T.ID AS "testId",
                U.ID AS "testerId",
                U."name" AS "testerName",
                TT."gender" AS "testerGender",
                DATE_PART('year', AGE(TT."birthDate"))::integer AS "testerAge",
                U."location" AS "testerLocation",
                U.CAREER AS "testerCareer",
                TT.hobbies AS "testerHobbies",
                TT."digitalSavviness" AS "testerDigiSav",
                U."profilePhoto" AS "testerProfilePic"
              FROM PUBLIC."Tests" T,
                PUBLIC."Questions_Sections" Q_S,
                PUBLIC."Answers" ANS,
                PUBLIC."Testers" TT,
                PUBLIC."Users" U
              WHERE Q_S."testId" = T.ID
                AND ANS."questionId" = Q_S.ID
                AND TT."userId" = ANS."userId"
                AND U.ID = TT."userId"
                AND T."userId" = ${userId}
                AND T.ID = ${testId}
                AND T."isDeleted" = FALSE ) TEMP2 ON TEMP1."testId" = TEMP2."testId";
          `

          // `
          // SELECT DISTINCT *
          // FROM
          //   (SELECT T.ID AS "testId",
          //           T."name" AS "testName",
          //           T."type" AS "testType",
          //           DEADLINE AS "testDeadline",
          //           COUNT(C.ID) AS "testersCount",
          //           T.PAYMENT AS "testPayment"
          //     FROM PUBLIC."Tests" T
          //     LEFT JOIN PUBLIC."Contacted_Users" C ON C."testId" = T.ID
          //     WHERE T."userId" = ${userId}
          //       AND T.ID = ${testId}
          //       AND T."isDeleted" = FALSE
          //     GROUP BY T.ID) TEMP1
          // LEFT JOIN
          //   (SELECT DISTINCT T.ID AS "testId",
          //                    U.ID AS "testerId",
          //                    U."name" AS "testerName",
          //                    U.CAREER AS "testerCareer",
          //                    U."location" AS "testerLocation",
          //                    U."profilePhoto" AS "testerProfilePic"
          //     FROM PUBLIC."Tests" T,
          //          PUBLIC."Questions_Sections" Q_S,
          //          PUBLIC."Answers" ANS,
          //          PUBLIC."Users" U
          //     WHERE Q_S."testId" = T.ID
          //       AND ANS."questionId" = Q_S.ID
          //       AND U.ID = ANS."userId"
          //       AND T."userId" = ${userId}
          //       AND T.ID = ${testId}
          //       AND T."isDeleted" = FALSE ) TEMP2 ON TEMP1."testId" = TEMP2."testId";
          // `
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
                withinGender: tester.withinGender,
                testerGender: tester.testerGender,
                withinAge: tester.withinAge,
                testerAge: tester.testerAge,
                withinLocation: tester.withinLocation,
                testerLocation: tester.testerLocation,
                withinCareer: tester.withinCareer,
                testerCareer: tester.testerCareer,
                withinHobbies: tester.withinHobbies,
                sameHobbies: tester.sameHobbies,
                withinDigiSav: tester.withinDigiSav,
                testerDigiSav: tester.testerDigiSav,
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
