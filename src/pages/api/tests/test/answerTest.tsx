import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";
import { Form } from "@/utils/testCreatorHelper";
import { QuestionData } from "@/components/test-content-components/Question";

const AnswerTest = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const { userId, formData } = req.body;
      try {
        // create the initial query for inserting answers into the database
        let query = `INSERT INTO public."Answers"("userId", "questionId", answer)
                     VALUES `;

        // filter out sections (as they don't have answers) and store the remaining questions in questionTemp
        const questionTemp = [...(formData as Form).question_section].filter(
          (q) => !q.isSection
        );

        // iterate over the questions and construct the query
        questionTemp.forEach((q_s, key) => {
          // add comma separator if it's not the first question in the query
          query += key > 0 ? ", " : "";

          // append the values for the current question to the query
          query += `(${userId}, ${q_s.id}, '${(q_s as QuestionData).answer}')`;
        });

        query += ";";

        // execute the query
        const result = await pool.query(query);

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

export default AnswerTest;
