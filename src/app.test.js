//Integration test

const recordService = require("./services/record.service");
const dotenv = require("dotenv");
const mongoInitialize = require("./loaders/mongo");

dotenv.config();
mongoInitialize();

test("The data is ", () => {
  const model = {
    startDate: new Date("2015-04-26"),
    endDate: new Date("2015-05-27"),
    minCount: 2925,
    maxCount: 2930,
  };
  return recordService.get(model).then((data) => {
    expect(data[0].key).toBe("KISmCicA");
  });
});
