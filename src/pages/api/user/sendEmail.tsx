import { NextApiRequest, NextApiResponse } from "next";
import { transporter } from "@/lib/email";
import { pool } from "@/lib/db";

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const { email, subject, message } = req.body;

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject,
        html: message,
      };

      try {
        const result = await pool.query(
          `SELECT * FROM "Users" WHERE email = '${email}';`
        );

        // Verify if recipient exists in database first
        if (result.rows.length === 1) {
          await transporter.sendMail(mailOptions);
          res.status(200).json({ message: "E-mail sent successfully." });
        } else {
          return res.status(400).send({ message: "Invalid E-mail." });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send e-mail." });
      }
      break;
  }
};

export default sendEmail;
