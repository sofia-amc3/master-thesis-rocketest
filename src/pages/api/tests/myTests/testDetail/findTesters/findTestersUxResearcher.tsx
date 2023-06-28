import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/lib/db";

export interface FoundUsers {
  selected?: boolean; // used only for the frontend
  userId: number;
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
  withinDigiSav: boolean;
  userDigiSav: number;
  userProfilePhoto: string;
}

interface FindTestersQuery extends FoundUsers {
  testId: number;
  testName: string;
  criteriaAge: string;
  criteriaGender: string;
  criteriaDigiSav: number[];
  criteriaHobbies: string[];
  criteriaLocation: string;
  criteriaCareers: string[];
}

export interface FindTestersResponse {
  testId: number;
  testName: string;
  criteriaAge: string;
  criteriaGender: string;
  criteriaDigiSav: number[];
  criteriaHobbies: string[];
  criteriaLocation: string;
  criteriaCareers: string[];
  foundUsers: FoundUsers[];
}

const FindTestersUXResearcherHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET":
      const { userId, testId } = req.query;
      try {
        const result = await pool.query(
          // Query Explanation:
          // TEMP1 (subquery): retrieves data from tables: "Tests", "Selection_Criteria", "Contacted_Users" (test related info: id, name, & criteria for age, gender, d.s., hobbies, location and careers)
          // TEMP2 (subquery): retrieves data from tables: "Users", "Testers" (user related info: id, name, age, gender, location, career, d.s., hobbies, contacted or not)
          // Main Query: Joins TEMP1 and TEMP2 based on the test ID
          //             The WHERE clause filters the results based on matching criteria between the test's selection criteria and the user's attributes
          //             The results are then ordered by whether the user has been contacted for the test and the user's name in ascending order
          `
          SELECT DISTINCT TEMP1."testId",
                          TEMP1."testName",
                          TEMP1."criteriaAge",
                          TEMP1."criteriaGender",
                          TEMP1."criteriaDigiSav",
                          TEMP1."criteriaHobbies",
                          TEMP1."criteriaLocation",
                          TEMP1."criteriaCareers",
                          TEMP2."userId",
                          TEMP2."userName",
                          TEMP2."wasContacted",
                          TEMP1."criteriaGender" = TEMP2."userGender" AS "withinGender",
                          TEMP2."userGender",
                          TEMP1."criteriaAge" @> TEMP2."userAge" AS "withinAge",
                          TEMP2."userAge",
                          TEMP1."criteriaLocation" = TEMP2."userLocation" AS "withinLocation",
                          TEMP2."userLocation",
                          TEMP1."criteriaCareers" @> ARRAY[TEMP2."userCareer"] AS "withinCareer",
                          TEMP2."userCareer",
                          TEMP1."criteriaHobbies" && TEMP2."userHobbies" AS "withinHobbies",
                          ARRAY
                          (SELECT UNNEST(TEMP1."criteriaHobbies") INTERSECT SELECT UNNEST(TEMP2."userHobbies")) AS "sameHobbies",
                          TEMP1."criteriaDigiSav" @> ARRAY[TEMP2."userDigiSav"] AS "withinDigiSav",
                          TEMP2."userDigiSav",
                          TEMP2."userProfilePhoto"
          FROM
            (SELECT T.ID AS "testId",
                    T."name" AS "testName",
                    SELC."ageRange" AS "criteriaAge",
                    SELC."gender" AS "criteriaGender",
                    SELC."digitalSavviness" AS "criteriaDigiSav",
                    SELC."hobbies" AS "criteriaHobbies",
                    SELC."location" AS "criteriaLocation",
                    SELC."careers" AS "criteriaCareers"
              FROM PUBLIC."Tests" T
                   INNER JOIN PUBLIC."Selection_Criteria" SELC ON T.ID = SELC."testId"
                   LEFT JOIN PUBLIC."Contacted_Users" C ON C."testId" = T.ID
              WHERE T."userId" = ${userId}
                AND T.ID = ${testId}
                AND T."isDeleted" = FALSE
              GROUP BY T.ID, SELC."testId") TEMP1
          LEFT JOIN
            (SELECT ${testId} AS "testId",
                    U.ID AS "userId",
                    U."name" AS "userName",
                    DATE_PART('year', AGE(TT."birthDate"))::integer AS "userAge",
                    TT."gender" AS "userGender",
                    U."location" AS "userLocation",
                    U."career" AS "userCareer",
                    TT."digitalSavviness" AS "userDigiSav",
                    TT."hobbies" AS "userHobbies",
                    CASE WHEN
                              (SELECT COUNT(*)
                              FROM PUBLIC."Contacted_Users" CU
                              WHERE CU."internalUserId" = TT."userId"
                              AND CU."testId" = ${testId}
                              AND CU.platform='Rocketest' ) > 0
                            THEN TRUE
                            ELSE FALSE
                      END AS "wasContacted",
                    U."profilePhoto" AS "userProfilePhoto"
              FROM PUBLIC."Users" U
              JOIN PUBLIC."Testers" TT ON U.ID = TT."userId") TEMP2 ON TEMP1."testId" = TEMP2."testId"
          WHERE (TEMP1."criteriaGender" = TEMP2."userGender"
              OR TEMP1."criteriaAge" @> TEMP2."userAge"
              OR TEMP1."criteriaLocation" = TEMP2."userLocation"
              OR TEMP1."criteriaCareers" @> ARRAY[TEMP2."userCareer"]
              OR TEMP1."criteriaHobbies" && TEMP2."userHobbies"
              OR TEMP1."criteriaDigiSav" @> ARRAY[TEMP2."userDigiSav"])
          ORDER BY TEMP2."wasContacted" ASC, TEMP2."userName" ASC ;
          `
        );

        if (result.rows.length > 0) {
          const list = result.rows as FindTestersQuery[];
          const response = {
            testId: list[0].testId,
            testName: list[0].testName,
            criteriaAge: list[0].criteriaAge,
            criteriaGender: list[0].criteriaGender,
            criteriaDigiSav: list[0].criteriaDigiSav,
            criteriaHobbies: list[0].criteriaHobbies,
            criteriaLocation: list[0].criteriaLocation,
            criteriaCareers: list[0].criteriaCareers,
            foundUsers: [],
          } as FindTestersResponse;

          list.forEach((user) => {
            response.foundUsers.push({
              userId: user.userId,
              userName: user.userName,
              wasContacted: user.wasContacted,
              withinGender: user.withinGender,
              userGender: user.userGender,
              withinAge: user.withinAge,
              userAge: user.userAge,
              withinLocation: user.withinLocation,
              userLocation: user.userLocation,
              withinCareer: user.withinCareer,
              userCareer: user.userCareer,
              withinHobbies: user.withinHobbies,
              sameHobbies: user.sameHobbies,
              withinDigiSav: user.withinDigiSav,
              userDigiSav: user.userDigiSav,
              userProfilePhoto: user.userProfilePhoto,
            });
          });

          return res.status(200).send(response);
        }
        return res
          .status(400)
          .send({ message: "Unable to get test information" });
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

export default FindTestersUXResearcherHandler;
