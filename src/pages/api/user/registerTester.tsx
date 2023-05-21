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
      const nameRegex = /^[a-zA-Z0-9\u00C0-\u017F.]{1,20}$/;
      if (!nameRegex.test(name)) {
        return res
          .status(400)
          .send(
            "Invalid Name. It should contain only letters, numbers, spaces, and dots (.) with a maximum of 20 characters."
          );
      }

      // password validation
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res
          .status(400)
          .send(
            "Password must have at least 8 characters, one uppercase letter, one special character, and one number."
          );
      }

      // e-mail validation
      const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send("Invalid E-mail.");
      }

      // location validation
      const locationRegex = /^[A-Za-z, ]{1,30}$/;
      if (location && !locationRegex.test(location)) {
        return res
          .status(400)
          .send(
            "Invalid location. Only letters and ',' allowed, with a maximum of 30 characters."
          );
      }

      // job title validation
      const jobTitleRegex = /^[A-Za-z, .]+$/;
      if (jobTitle && !jobTitleRegex.test(jobTitle)) {
        return res
          .status(400)
          .send("Invalid job title. Only letters, ',' and '.' allowed.");
      }

      // checks if mandatory fields were fulfilled
      if (!name || !email || !password)
        return res.status(400).send("All mandatory fields must be provided.");

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

          const result = await pool.query(
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
            throw "There was an error registering the user.";
          }
        } else {
          // user already exists
          return res
            .status(400)
            .send("There is already an account using this e-mail.");
        }
      } catch (error) {
        return res.status(400).send(error);
      }
      break;

    default:
      return res.status(500).send("There was a problem with the connection.");
      break;
  }
};

export default registerTesterHandler;
