const usersLinkedin = [
  { name: "user1", email: "user1@testeLinkedin.com" },
  { name: "_user2", email: "user2@testeLinkedin.com" },
  { name: "_user3", email: "user3@testeLinkedin.com" },
  { name: "_user4", email: "user4@testeLinkedin.com" },
  { name: "user5", email: "user5@testeLinkedin.com" },
  { name: "_user6", email: "user6@testeLinkedin.com" },
];

const express = require("express");
const { usersFB } = require("./utils/facebookUsers");

const app = express();
// parse requests of content-type - application/json
app.use(express.json());

// simple route for Facebook
app.get("/facebook/", (req, res) => {
  if (req.query["search"]) {
    res.json(usersFB.filter((user) => user.name.includes(req.query["search"])));
  } else {
    res.json(usersFB);
  }
});

// simple route for LinkedIn
app.get("/linkedin/", (req, res) => {
  if (req.query["search"]) {
    res.json(
      usersLinkedin.filter((user) => user.name.includes(req.query["search"]))
    );
  } else {
    res.json(usersLinkedin);
  }
});

// set port, listen for requests
app.listen(8080, () => {
  console.log(`Server is running on port ${8080}.`);
});
