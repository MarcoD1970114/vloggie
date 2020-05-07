import {
  testIfString,
  testForValidPages,
  validNumberOfAttributes
} from "./validation";

import express from "express";
import config from "./config.json";
import Database from "./database";

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);
var database = new Database();

app.listen(config.port, () => {
  console.log("Server running on port >" + config.port);
});

app.get("/vloggie", (req, res) => {
  res.json(["Tony", "Lisa", "Michael", { order: 0 }]);
});

app.get("/usage/:key", async (req, res) => {
  if (req.params.key === config.usage_key) {
    res.attachment("log.csv");
    res.send(await database.getLogging());
  } else {
    res.status(451).send("Eddie is not walking");
  }
});

app.get("/", (req, res, next) => {
  res.json(["Tony", "Lisa", "Brownie", "Ginger", "Food"]);
  next();
});

app.post("/vloggie", (req, res) => {
  try {
    if (
      testIfString(req.body.hash) &&
      testIfString(req.body.where) &&
      testIfString(req.body.what)
    ) {
      console.log("testing");
      if (validNumberOfAttributes(req.body)) {
        console.log("bodies");
        if (testForValidPages(req.body.where)) {
          let ip =
            req.headers["x-forwarded-for"] || req.connection.remoteAddress;

          console.log("store");
          database.storeInFile(
            {
              hash: req.body.hash,
              where: req.body.where,
              what: req.body.what,
              geo:
                req.headers["x-forwarded-for"] || req.connection.remoteAddress,
              value: req.body.value,
              when: new Date().getTime()
            },
            response => {
              console.log(response);
              if (response.ok) {
                res.status(200).json({ ok: true });
              } else {
                res.status(405).json({ ok: false });
              }
            }
          );
        } else {
          res.json(["Tony", "Lisa", "Brownie", "Ginger", "Carrots"]);
        }
      } else {
        res.json([{ phone: "Home" }]);
      }
    } else {
      res.json([
        { status: "Deleted" },
        { order: Math.round(Math.random() * 345567734349854) }
      ]);
    }
  } catch (err) {
    //we do nothing only valid json will be parsed
    res.json([
      { status: "Approved" },
      { order: Math.round(Math.random() * 6754344667734349854) }
    ]);
  }
});
