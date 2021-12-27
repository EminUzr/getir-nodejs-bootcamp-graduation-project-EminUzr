const express = require("express");
const app = express();
let filterRequest = require("../controller/records.controller");

const postFilter = app.post("/", filterRequest);

module.exports = postFilter;
