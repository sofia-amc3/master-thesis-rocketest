import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

const DEFAULT_PROFILE_PHOTO_TESTER = "/userExamples/user--02.svg";

const registerTesterHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "POST":
      const {
        name,
        email,
        password,
        birthDate,
        gender,
        location,
        jobTitle,
        hobbies,
        digitalSavvinessGeneral,
        profilePhoto,
      } = req.body;

      // name validation
      const nameRegex = /^[a-zA-Z0-9 \u00C0-\u017F.]{1,20}$/;
      if (!nameRegex.test(name)) {
        return res.status(400).send({
          message:
            "Invalid Name. It should contain only letters, numbers, spaces, and dots (.) with a maximum of 20 characters.",
        });
      }

      // password validation
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).send({
          message:
            "Password must have at least 8 characters, one uppercase letter, one special character, and one number.",
        });
      }

      // e-mail validation
      const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send({ message: "Invalid E-mail." });
      }

      // location validation
      const locationRegex = /^[A-Za-z, \u00C0-\u017F.]{1,30}$/;
      if (location && !locationRegex.test(location)) {
        return res.status(400).send({
          message:
            "Invalid location. Only letters and ',' allowed, with a maximum of 30 characters.",
        });
      }

      // job title validation
      const jobTitleRegex = /^[A-Za-z, .]+$/;
      if (jobTitle && !jobTitleRegex.test(jobTitle)) {
        return res.status(400).send({
          message: "Invalid job title. Only letters, ',' and '.' allowed.",
        });
      }

      // birthdate validation
      // calculate age based on birth date
      const today = new Date();
      let age = today.getFullYear() - new Date(birthDate).getFullYear(); // subtracts the user's birth year to the current year
      const monthDiff = today.getMonth() - new Date(birthDate).getMonth(); // subtracts the user's birth month to the current month
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < new Date(birthDate).getDate())
      ) {
        age--;
      }
      // check if the user is above 18 years old
      if (age < 18) {
        return res.status(400).send({
          message: "You must be 18 years or older to register in Rocketest.",
        });
      }

      // checks if mandatory fields were fulfilled
      if (!name || !email || !password)
        return res
          .status(400)
          .send({ message: "All mandatory fields must be provided." });

      // if user did not upload a profile photo, replace it with a default user photo
      const profilePhotoPath = profilePhoto || DEFAULT_PROFILE_PHOTO_TESTER;

      try {
        // check if the e-mail already exists
        const existingUser = await pool.query(
          `SELECT * FROM "Users" WHERE email = '${email}';`
        );

        if (existingUser.rows.length === 0) {
          // register the user
          const tempHobbiesArray =
            "ARRAY " + JSON.stringify(hobbies).replace(/"/g, "'") + "::text[]";

          await pool.query(
            `WITH tmpUsers AS (
              INSERT INTO "Users"
                     (email, password, name, career, location, "profilePhoto", type)
                     VALUES
                     ('${email}','${password}','${name}','${jobTitle}','${location}', '${profilePhotoPath}', 1)
                     RETURNING id)
                     INSERT INTO "Testers"
                            ("userId", "birthDate", gender, hobbies, "digitalSavviness")
                            SELECT id, '${birthDate}', '${gender}', ${tempHobbiesArray}, '${digitalSavvinessGeneral}'
                            FROM tmpUsers;`
          );

          // check if user was created
          const createdUser = await pool.query(
            `SELECT * FROM "Users" WHERE email = '${email}' AND password = '${password}';`
          );

          if (createdUser.rows.length === 1) {
            // registration successful
            return res.status(200).send(createdUser.rows[0]);
          } else {
            // registration failed
            throw { message: "There was an error registering the user." };
          }
        } else {
          // user already exists
          return res.status(400).send({
            message: "There is already an account using this e-mail.",
          });
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

export default registerTesterHandler;
