import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";
import { Form, Question, Section, Option } from "@/utils/testCreatorHelper";

// interface for the result rows of the query
interface Q_S_O {
  testName: string;
  testType: string;
  testCreator: string;
  testDescription: string;
  QS_id: number;
  QS_name: string;
  QS_description: string;
  QS_isSection: boolean;
  O_id: number;
  O_name: string;
  O_image: string;
}

const GetTestForm = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const { testId } = req.query;
      try {
        const result = await pool.query(
          // Query Explanation: retrieves information about a specific test, including its name, type, creator, description,
          //                    as well as details about its associated questions, sections, and options
          `SELECT T.name AS "testName",
                  T.type AS "testType",
                  U.name AS "testCreator",
                  T.description AS "testDescription",
                  Q_S.id AS "QS_id",
                  Q_S.name AS "QS_name",
                  Q_S.description AS "QS_description",
                  Q_S."isSection" AS "QS_isSection",
                  O.id AS "O_id",
                  O.name AS "O_name",
                  O.image AS "O_image"
          FROM "Tests" T
          LEFT JOIN "Users" U ON T."userId"=U.id
          LEFT JOIN "Questions_Sections" Q_S ON Q_S."testId"=T.id
          LEFT JOIN "Options" O ON O."questionId"=Q_S.id
          WHERE T.id='${testId}'
          ORDER BY Q_S.id ASC, O.id ASC;`
        );

        const data = result.rows as Q_S_O[];

        if (data.length > 0) {
          // initialize the FormData object with test's information
          const FormData: Form = {
            testName: data[0].testName,
            testType: data[0].testType,
            testDescription: data[0].testDescription,
            testCreator: data[0].testCreator,
            question_section: [],
          };

          // map to store questions and sections using their IDs as keys
          const questionSectionMap: { [key: number]: Question | Section } = {};

          // process each entry in the result set
          data.forEach((entry) => {
            const QS_id = entry.QS_id;
            const QS_name = entry.QS_name;
            const QS_description = entry.QS_description;
            const QS_isSection = entry.QS_isSection;

            // check if the question/section does not exist
            if (!questionSectionMap[QS_id]) {
              // create a new question or section object based on the "isSection" boolean
              const questionSection: Question | Section = QS_isSection
                ? {
                    id: QS_id,
                    name: QS_name || "",
                    description: QS_description || "",
                    isSection: QS_isSection,
                  }
                : {
                    id: QS_id,
                    name: QS_name,
                    options: [],
                    isSection: QS_isSection,
                  };

              // add the question/section to the FormData and the map
              questionSectionMap[QS_id] = questionSection;
              FormData.question_section.push(questionSection);
            }

            // if it's not a section, create an Option object and add it to the corresponding Question's options array
            if (!QS_isSection) {
              const option: Option = {
                id: entry.O_id,
                name: entry.O_name,
                imgSrc: entry.O_image,
                imgName: entry.O_name,
              };

              (questionSectionMap[QS_id] as Question).options.push(option);
            }
          });

          return res.status(200).send(FormData);
        }
        return res.status(400).send({ message: "No test was found." });
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

export default GetTestForm;
