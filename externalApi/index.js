const express = require("express");
const { fakeUsers } = require("./utils/fakeUsers");

const app = express();
// parse requests of content-type - application/json
app.use(express.json());

// simple route for Facebook
app.get("/customAPI/", (req, res) => {
  if (req.query["search"]) {
    res.json(
      fakeUsers.filter((user) => user.name.includes(req.query["search"]))
    );
  } else {
    res.json(fakeUsers);
  }
});

// set port, listen for requests
app.listen(8080, () => {
  console.log(`Server is running on port ${8080}.`);
});
