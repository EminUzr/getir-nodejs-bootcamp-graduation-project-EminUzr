let records = require("../models/records.model");

const get = function (filterModel) {
  return records.aggregate([
    {
      $group: {
        _id: {
          key: "$key",
          createdAt: "$createdAt",
          totalCounts: {
            $sum: "$counts",
          },
        },
      },
    },
    {
      $match: {
        "_id.createdAt": {
          $gte: filterModel.startDate,
          $lte: filterModel.endDate,
        },
        "_id.totalCounts": {
          $gte: parseInt(filterModel.minCount),
          $lte: parseInt(filterModel.maxCount),
        },
      },
    },
    {
      $project: {
        _id: null,
        key: "$_id.key",
        createdAt: "$_id.createdAt",
        totalCounts: "$_id.totalCounts",
      },
    },
  ]);
};

module.exports = { get };
