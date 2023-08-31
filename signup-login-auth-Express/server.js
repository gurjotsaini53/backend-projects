const express = require("express");
const app = express();

const fs = require("fs");
const { constrainedMemory } = require("process");
app.use(express.static("public"));
app.use(express.urlencoded());

app.post("/login", (req, res) => {
  //   console.log(req.body);

  fs.readFile("users.txt", "utf-8", (err, data) => {
    let records = JSON.parse(data);
    // console.log(records);
    let result = records.filter((item) => {
      if (
        item.username == req.body.username &&
        item.password == req.body.password
      ) {
        return true;
      }
    });
    if (result.length == 0) {
      res.send("Invalid user / password");
    } else {
      res.send("welcome to Dashboard");
    }
  });
});

app.post("/register", (req, res) => {
  fs.readFile("users.txt", "utf-8", (err, data) => {
    let records = JSON.parse(data);
    let result = records.filter((item) => {
      if (
        item.username == req.body.username &&
        item.password == req.body.password
      ) {
        return true;
      }
    });

    if (result.length != 0) {
      res.send("user already registered ");
    } else {
      records.push(req.body);
      fs.writeFile("users.txt", JSON.stringify(records), (err) => {
        if (err) console.log("Error while updating file");
        else {
          console.log("Data added to file successfully");
          res.send("Registered successfully");
        }
      });
    }
  });
  1;
});
app.listen(3000, (err) => {
  if (err) {
    console.log("unable to run server");
  } else {
    console.log("Server started");
  }
});
