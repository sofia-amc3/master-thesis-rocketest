import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";
import { FormCriteria } from "@/pages/tests/createTest/testDetails";
import { Section, Question } from "@/utils/testCreatorHelper";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

const InsertTest = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const { userId, formData } = req.body;
      const _form = formData as FormCriteria;
      try {
        const tempCareersArray =
          "ARRAY " +
          JSON.stringify(_form.careers).replace(/"/g, "'") +
          "::text[]";
        const tempHobbiesArray =
          "ARRAY " +
          JSON.stringify(_form.hobbies).replace(/"/g, "'") +
          "::text[]";
        const tempDigiSavArray =
          "ARRAY " + JSON.stringify(_form.digitalSavviness) + "::integer[]";

        // beginning of the query: tests general info and selection criteria
        let queryBuild = `
        WITH tmpTests AS (
            INSERT INTO "Tests" ("userId", name, type, description, deadline, payment, "isPublic")
            VALUES (${userId}, '${_form.testName}', '${_form.testType}', '${_form.testCreator}', '${_form.deadlineDate}' , ${_form.payment}, ${_form.privacy})
            RETURNING id AS testId
        ),
        tmpSelectionCriteria AS (
            INSERT INTO "Selection_Criteria" ("testId", gender, location, hobbies, careers, "ageRange", "digitalSavviness")
            SELECT testId, '${_form.gender}', '${_form.location}', ${tempHobbiesArray}, ${tempCareersArray}, int4range(${_form.ageRange[0]}, ${_form.ageRange[1]}), ${tempDigiSavArray}
            FROM tmpTests
        ),
        `;

        // iterate through the "_form.question_section" array in reverse order
        // to maintain the correct order of sections and questions in the database
        // (they should be inserted in the same order as they appear in the array)
        for (
          let q_sKey = _form.question_section.length - 1;
          q_sKey >= 0;
          q_sKey--
        ) {
          if (_form.question_section[q_sKey].isSection) {
            const s = _form.question_section[q_sKey] as Section;

            queryBuild += `tmpQ_S${q_sKey} AS (
                INSERT INTO "Questions_Sections" ("testId", name, description, "isSection")
                SELECT testId, '${s.name}', '${s.description}', TRUE
                FROM tmpTests
                RETURNING id AS sectionId
            ),
            `;
          } else {
            const q = _form.question_section[q_sKey] as Question;

            queryBuild += `tmpQ_S${q_sKey} AS (
                INSERT INTO "Questions_Sections" ("testId", name, "isSection")
                SELECT testId, '${q.name}', FALSE
                FROM tmpTests
                RETURNING id AS questionId
            ),
            `;

            for (let optKey = q.options.length - 1; optKey >= 0; optKey--) {
              const opt = q.options[optKey];

              queryBuild += `tmpOptions${q_sKey}${optKey} AS (
                INSERT INTO "Options" ("questionId", name, image)
                SELECT questionId, '${opt.name}', '${opt.imgSrc}'
                FROM tmpQ_S${q_sKey}
              )`;
              // does not add the final comma in the sql INSERT query
              if (optKey != 0) {
                queryBuild += `,
                `;
              }
            }

            // q.options.forEach((opt, optKey) => {
            //   queryBuild += `tmpOptions${q_sKey}${optKey} AS (
            //       INSERT INTO "Options" ("questionId", name, image)
            //       SELECT questionId, '${opt.name}', '${opt.imgSrc}'
            //       FROM tmpQ_S${q_sKey}
            //   ),
            //   `;
            // });
          }
        }

        queryBuild += `
        SELECT testid AS "testId" FROM tmpTests;
        `;

        console.log("Insert Test: ", userId, queryBuild);

        const result = await pool.query(queryBuild);

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

export default InsertTest;
