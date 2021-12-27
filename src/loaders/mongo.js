const Mongoose = require("mongoose");

const mongoInitialize = () => {
  Mongoose.connect(`${process.env.DB_URL}`)
    .then(() => {
      console.log("Mongodb successfully connected.");
    })
    .catch((err) => {
      console.log("Error =>>>>", err);
    });
};

module.exports = mongoInitialize;
