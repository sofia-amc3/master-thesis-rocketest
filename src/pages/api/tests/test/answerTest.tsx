import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";
import { Form } from "@/utils/testCreatorHelper";
import { QuestionData } from "@/components/test-content-components/Question";

const AnswerTest = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const { userId, formData } = req.body;
      try {
        let query = `INSERT INTO public."Answers"("userId", "questionId", answer)
                     VALUES `;

        const questionTemp = [...(formData as Form).question_section].filter(
          (q) => !q.isSection
        );

        questionTemp.forEach((q_s, key) => {
          query += key > 0 ? ", " : "";

          query += `(${userId}, ${q_s.id}, '${(q_s as QuestionData).answer}')`;
        });

        query += ";";

        const result = await pool.query(query);

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

export default AnswerTest;
