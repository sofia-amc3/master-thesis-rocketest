const express = require("express");
const fakeUsersFacebook = require("./utils/fakeUsersFacebook.json");
const fakeUsersLinkedIn = require("./utils/fakeUsersLinkedIn.json");

const app = express();
// parse requests of content-type - application/json
app.use(express.json());

const buildCorrectParams = (ageRange = "", career = "", hobbies = "") => {
  const finalAgeRange = ageRange ? ageRange.split(",") : [0, 0];
  const finalCareer = career ? career.split(",") : [];
  const finalHobbies = hobbies ? hobbies.split(",") : [];
  return {
    finalAgeRange,
    finalCareer,
    finalHobbies,
  };
};

// simple route mocking Facebook's API
app.get("/api/simulatingFacebook/getUsers", (req, res) => {
  let { ageRange, gender, location, career, hobbies } = req.query;

  if (ageRange || gender || location || career || hobbies) {
    let { finalAgeRange, finalCareer, finalHobbies } = buildCorrectParams(
      ageRange || "",
      career || "",
      hobbies || ""
    );

    const filteredUsers = fakeUsersFacebook.filter((user) => {
      if (
        user.age &&
        user.age > finalAgeRange[0] &&
        user.age < finalAgeRange[1]
      ) {
        return true;
      }

      // gender.split(" ")[0] will split the "Male only" into "Male" for example, and "Female only" into "Female"
      if (
        (user.gender && user.gender === (gender || "").split(" ")[0]) ||
        gender === "No preference"
      ) {
        return true;
      }

      if (user.location?.includes(location)) {
        return true;
      }

      // intersect the user's and the criteria's career to see if they intersect (the user has one of the selected careers)
      const filteredUserCareer = finalCareer.filter((value) =>
        user.career?.includes(value)
      );
      if (filteredUserCareer.length > 0) {
        return true;
      }

      // intersect the user's and the criteria's hobbies to see if they intersect (the user has one or more of the selected hobbies)
      const filteredUserHobbies = finalHobbies.filter((value) =>
        user.hobbies?.includes(value)
      );
      if (filteredUserHobbies.length > 0) {
        return true;
      }
    });

    res.json(filteredUsers);
  } else {
    res.json(fakeUsersFacebook);
  }
});

// simple route mocking LinkedIn's API
app.get("/api/simulatingLinkedIn/getUsers", (req, res) => {
  let { location, career } = req.query;

  if (location || career) {
    const finalCareer = career ? career.split(",") : [];

    const filteredUsers = fakeUsersLinkedIn.filter((user) => {
      if (user.location?.includes(location)) {
        return true;
      }

      // intersect the user's and the criteria's career to see if they intersect (the user has one of the selected careers)
      const filteredUserCareer = finalCareer.filter((value) =>
        user.career?.includes(value)
      );
      if (filteredUserCareer.length > 0) {
        return true;
      }
    });

    res.json(filteredUsers);
  } else {
    res.json(fakeUsersLinkedIn);
  }
});

// set port, listen for requests
app.listen(8080, () => {
  console.log(`Server is running on port ${8080}.`);
});
