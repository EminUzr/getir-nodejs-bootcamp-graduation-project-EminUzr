const recordService = require("../services/record.service");
const moment = require("moment");

let filterRequest = function (req, res) {
  let model = {
    startDate: null,
    endDate: null,
    minCount: req.body.minCount,
    maxCount: req.body.maxCount,
  };

  if (model.minCount > model.maxCount) {
    return res.send({
      code: 400,
      msg: "Failed Request: Minimum count can not be bigger than maximum count!",
    });
  }

  let startDate = moment(req.body.startDate, "YYYY-MM-DD", true);
  let endDate = moment(req.body.endDate, "YYYY-MM-DD", true);

  if (!startDate.isValid()) {
    return res.send({
      code: 400,
      msg: "Failed Request: Not a valid date!",
    });
  }

  if (!endDate.isValid()) {
    return res.send({
      code: 400,
      msg: "Failed Request: Not a valid date!",
    });
  }

  if (startDate.diff(endDate) > 0) {
    return res.send({
      code: 400,
      msg: "Failed Request: Start date can not be after end date!",
    });
  }

  model.startDate = startDate.toDate();
  model.endDate = endDate.toDate();

  recordService
    .get(model)
    .then((data) => {
      return res.send({
        code: 0,
        msg: "Successful Request",
        records: data.map((x) => {
          return {
            key: x.key,
            createdAt: x.createdAt,
            totalCounts: x.totalCounts,
          };
        }),
      });
    })
    .catch((err) => {
      return res.send({
        code: 500,
        msg: `Failed Request, error =>> ${err}`,
      });
    });
};

module.exports = filterRequest;
