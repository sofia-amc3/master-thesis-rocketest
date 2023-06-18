import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";
import axios from "axios";

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

      try {
        const params = {
          ageRange: finalAgeRange,
          gender: finalGender,
          location: finalLocation,
          careers: finalCareers,
          hobbies: finalHobbies,
        };

        const responseFindExternalTesters = {
          foundUsers: [],
        } as FindExternalTestersResponse;

        await axios
          .get(`http://localhost:8080/api/simulating${platform}/getUsers`, {
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
            return res.status(400).send(error);
          });
        return res.status(400).send("Unable to get test information");
      } catch (error) {
        return res.status(400).send(error);
      }
      break;

    default:
      return res.status(500).send("There was a problem with the connection.");
      break;
  }
};

export default GetTestersApiUXResearcherHandler;
