const Mongoose = require("mongoose");
const recordSchema = new Mongoose.Schema({
  key: String,
  createdAt: Date,
  counts: Array,
  value: String,
});

let records = Mongoose.model("records", recordSchema);
module.exports = records;
