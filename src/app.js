const express = require("express");
const app = express();
const dotenv = require("dotenv");
const postFilter = require("./route/records.route");
const mongoInitialize = require("./loaders/mongo");

dotenv.config();
mongoInitialize();

app.use(express.json());
app.post("/", postFilter);

app.listen(process.env.PORT, () => {
  console.log(`Process is running on ${process.env.PORT}`);
});
