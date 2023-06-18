import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";
import axios from "axios";
import FakeUsersFacebook from "@/../externalApi/utils/fakeUsersFacebook.json";
import FakeUsersLinkedIn from "@/../externalApi/utils/fakeUsersLinkedIn.json";

export interface FoundUsers {
  selected?: boolean; // used only for the frontend
  userId: number | string;
  userName: string;
  wasContacted: boolean;
  withinGender: boolean;
  userGender: string;
  withinAge: boolean;
  userAge: number;
  withinLocation: boolean;
  userLocation: string;
  withinCareer: boolean;
  userCareer: string;
  withinHobbies: boolean;
  sameHobbies: string[];
  userProfilePhoto: string;
}

interface FindExternalTestersRequest {
  id: number | string;
  profilePhoto?: string;
  name: string;
  age?: number;
  gender?: string;
  location?: string;
  career?: string;
  hobbies?: string;
}

export interface FindExternalTestersResponse {
  foundUsers: FoundUsers[];
}

export interface ContactedUsersQuery {
  externalUserId: number | string;
}

const GetTestersApiUXResearcherHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET":
      const { testId, platform, ageRange, gender, location, careers, hobbies } =
        req.query;

      const finalAgeRange = ageRange?.toString() || "",
        finalGender = gender
          ? gender === "No preference"
            ? gender
            : gender.toString().split(" ")[0]
          : "",
        finalLocation = location?.toString() || "",
        finalCareers = careers?.toString() || "",
        finalHobbies = hobbies?.toString() || "";

      const responseFindExternalTesters = {
        foundUsers: [],
      } as FindExternalTestersResponse;

      try {
        const params = {
          ageRange: finalAgeRange,
          gender: finalGender,
          location: finalLocation,
          careers: finalCareers,
          hobbies: finalHobbies,
        };

        const IN_USE_IP = process.env.EXTERNALAPI_IP || "localhost:8080"; //! PLEASE UPDATE THE LOCALHOST IP IF NECESSARY TO COMMUNICATE WITH EXTERNAL API

        await axios
          .get(`http://${IN_USE_IP}/api/simulating${platform}/getUsers`, {
            params,
          })
          .then(async (response) => {
            const _data = response.data as FindExternalTestersRequest[];

            //query to get contacted users from external platforms
            let result = { rows: [] };

            try {
              result = await pool.query(`
                SELECT C."externalUserId" 
                FROM PUBLIC."Contacted_Users" C 
                WHERE C."testId"=${testId} 
                  AND C.platform='${platform}';
              `);
            } catch {}

            const contactedUsers = (
              result.rows?.length > 0 ? result.rows : []
            ) as ContactedUsersQuery[];

            _data.map(async (foundUser, key) => {
              // intersect careers from selection criteria with user's career
              const filteredUserCareer = finalCareers
                .split(",")
                .filter((value) => foundUser.career?.includes(value));

              // intersect hobbies from selection criteria with user's hobbies
              const filteredUserHobbies = finalHobbies
                .split(",")
                .filter((value) => foundUser.hobbies?.includes(value));

              // building of foundUsers with necessary info to display in the frontend
              responseFindExternalTesters.foundUsers.push({
                userId: foundUser.id,
                userName: foundUser.name,
                userProfilePhoto: foundUser.profilePhoto || "",
                withinAge:
                  (foundUser.age &&
                    foundUser.age > Number(finalAgeRange.split(",")[0]) &&
                    foundUser.age < Number(finalAgeRange.split(",")[1])) ||
                  false,
                userAge: foundUser.age || 0,
                withinGender:
                  finalGender === "No preference" ||
                  new RegExp(`^${finalGender}`).test(foundUser.gender || "") ||
                  false,
                userGender: foundUser.gender || "",
                withinLocation:
                  foundUser.location?.includes(finalLocation) || false,
                userLocation: foundUser.location || "",
                withinCareer: filteredUserCareer.length > 0,
                userCareer: foundUser.career || "",
                withinHobbies: filteredUserHobbies.length > 0,
                sameHobbies:
                  filteredUserHobbies.length > 0 ? filteredUserHobbies : [],
                wasContacted:
                  contactedUsers.findIndex(
                    (user) =>
                      user.externalUserId.toString() === foundUser.id.toString()
                  ) > -1,
              });
            });

            return res.status(200).send(responseFindExternalTesters);
          })
          .catch((error) => {
            throw error;
          });
        return res
          .status(400)
          .send({ message: "Unable to get test information" });
      } catch (error) {
        return res.status(400).send(error);

        //! WARNING
        //! VERCEL APP WOULD NOT ALLOW FOR EXTERNAL API TO RUN
        //! IT COULD EITHER BE RUN EXTERNALLY OR THE INFORMATION COULD BE IMPORTED DIRECTLY WITH THE CODE BELOW
        //! EXTERNAL API IP COULD BE CHANGED ABOVE (l76)
        // let _data = [] as FindExternalTestersRequest[];
        // if (platform === "LinkedIn") {
        //   _data = FakeUsersLinkedIn as FindExternalTestersRequest[];
        // } else {
        //   _data = FakeUsersFacebook as FindExternalTestersRequest[];
        // }
        // //query to get contacted users from external platforms
        // let result = { rows: [] };
        // try {
        //   result = await pool.query(`
        //     SELECT C."externalUserId"
        //     FROM PUBLIC."Contacted_Users" C
        //     WHERE C."testId"=${testId}
        //       AND C.platform='${platform}';
        //   `);
        // } catch {}
        // const contactedUsers = (
        //   result.rows?.length > 0 ? result.rows : []
        // ) as ContactedUsersQuery[];
        // _data.map(async (foundUser, key) => {
        //   // intersect careers from selection criteria with user's career
        //   const filteredUserCareer = finalCareers
        //     .split(",")
        //     .filter((value) => foundUser.career?.includes(value));
        //   // intersect hobbies from selection criteria with user's hobbies
        //   const filteredUserHobbies = finalHobbies
        //     .split(",")
        //     .filter((value) => foundUser.hobbies?.includes(value));
        //   // building of foundUsers with necessary info to display in the frontend
        //   responseFindExternalTesters.foundUsers.push({
        //     userId: foundUser.id,
        //     userName: foundUser.name,
        //     userProfilePhoto: foundUser.profilePhoto || "",
        //     withinAge:
        //       (foundUser.age &&
        //         foundUser.age > Number(finalAgeRange.split(",")[0]) &&
        //         foundUser.age < Number(finalAgeRange.split(",")[1])) ||
        //       false,
        //     userAge: foundUser.age || 0,
        //     withinGender:
        //       finalGender === "No preference" ||
        //       new RegExp(`^${finalGender}`).test(foundUser.gender || "") ||
        //       false,
        //     userGender: foundUser.gender || "",
        //     withinLocation:
        //       foundUser.location?.includes(finalLocation) || false,
        //     userLocation: foundUser.location || "",
        //     withinCareer: filteredUserCareer.length > 0,
        //     userCareer: foundUser.career || "",
        //     withinHobbies: filteredUserHobbies.length > 0,
        //     sameHobbies:
        //       filteredUserHobbies.length > 0 ? filteredUserHobbies : [],
        //     wasContacted:
        //       contactedUsers.findIndex(
        //         (user) =>
        //           user.externalUserId.toString() === foundUser.id.toString()
        //       ) > -1,
        //   });
        // });
        // return res.status(200).send(responseFindExternalTesters);
      }
      break;

    default:
      return res
        .status(500)
        .send({ message: "There was a problem with the connection." });
      break;
  }
};

export default GetTestersApiUXResearcherHandler;
