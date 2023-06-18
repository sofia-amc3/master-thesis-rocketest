import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

interface testResultsQuery {
  testId: number;
  testName: string;
  questionId: number;
  questionName: string;
  optionId: number;
  optionName: string;
  answerCount: string;
  testersCount: number;
}

interface OptionInfo {
  optionName: string;
  answerCount: number;
}

interface QuestionInfo {
  questionId: number;
  questionName: string;
  options: OptionInfo[];
}

export interface testResultsResponse {
  success: boolean;
  testId: number;
  testName: string;
  testersCount: number;
  questions: QuestionInfo[];
  rawData: testResultsQuery[];
}

const GetTestResultsUXResearcherHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET":
      const { testId } = req.query;
      try {
        const result = await pool.query(
          `
          SELECT *
            FROM
                (SELECT T.ID AS "testId",
                        T."name" AS "testName",
                        Q_S.ID AS "questionId",
                        Q_S."name" AS "questionName",
                        O.ID AS "optionId",
                        O."name" AS "optionName"
                    FROM "Tests" T,
                        "Questions_Sections" Q_S,
                        "Options" O
                    WHERE T.ID = Q_S."testId"
                        AND O."questionId" = Q_S.ID
                        AND T.ID = ${testId}
                    GROUP BY T.ID,
                        Q_S.ID,
                        O.ID) TEMP1
            LEFT JOIN
                (SELECT ANS.ANSWER AS "answerName",
                        COUNT(ANS.ANSWER) AS "answerCount"
                    FROM "Tests" T,
                        "Questions_Sections" Q_S
                    LEFT JOIN "Answers" ANS ON Q_S.ID = ANS."questionId"
                    WHERE T.ID = Q_S."testId"
                        AND T.ID = ${testId}
                    GROUP BY ANS.ANSWER) TEMP2 ON TEMP1."optionName" = TEMP2."answerName"
            LEFT JOIN
                (SELECT ${testId} AS "testId",
                        COUNT("testers") AS "testersCount"
                    FROM
                        (SELECT DISTINCT ANS."userId" AS "testers"
                            FROM PUBLIC."Tests" T
                            LEFT JOIN PUBLIC."Questions_Sections" Q_S ON Q_S."testId" = T.ID
                            LEFT JOIN PUBLIC."Answers" ANS ON ANS."questionId" = Q_S.ID
                            WHERE T.ID = ${testId}) TEMP4) TEMP3 ON TEMP1."testId" = TEMP3."testId"
            ORDER BY "questionId" ASC
          `
        );

        if (result.rows.length > 0) {
          const list = result.rows as testResultsQuery[];
          const response = {
            success: true,
            testId: list[0].testId,
            testName: list[0].testName,
            testersCount: list[0].testersCount,
            questions: [],
            rawData: list,
          } as testResultsResponse;

          const questionMap: { [key: number]: QuestionInfo } = {};

          list.forEach((question) => {
            const Q_id = question.questionId;
            const Q_name = question.questionName;

            if (!questionMap[Q_id]) {
              const question: QuestionInfo = {
                questionId: Q_id,
                questionName: Q_name,
                options: [],
              };

              questionMap[Q_id] = question;
              response.questions.push(question);
            }

            const option: OptionInfo = {
              optionName: question.optionName,
              answerCount:
                (question.answerCount && Number(question.answerCount)) || 0,
            };

            questionMap[Q_id].options.push(option);
          });

          return res.status(200).send(response);
        }
        return res.status(200).send({ success: false });
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

export default GetTestResultsUXResearcherHandler;
