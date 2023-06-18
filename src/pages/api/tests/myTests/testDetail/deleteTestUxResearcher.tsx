import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

const DeleteTestUXResearcherHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "POST":
      const { userId, testId } = req.body;
      try {
        await pool.query(
          `UPDATE public."Tests" T
                  SET "isDeleted" = TRUE
                  WHERE T."userId" = ${userId} AND T.id = ${testId};`
        );

        // check if test was updated
        const updatedTest = await pool.query(
          `SELECT * FROM public."Tests" T
                        WHERE T."userId" = ${userId} 
                        AND T.id = ${testId} 
                        AND T."isDeleted" = TRUE;`
        );

        if (updatedTest.rows.length === 1) {
          // update successful
          return res.status(200).send("The test was deleted successfully.");
        } else {
          // update failed
          throw { message: "There was an error deleting the test." };
        }
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

export default DeleteTestUXResearcherHandler;
