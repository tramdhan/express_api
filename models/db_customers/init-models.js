var DataTypes = require("sequelize").DataTypes;
var _tbl_customers = require("./tbl_customers");

function initModels(sequelize) {
  var tbl_customers = _tbl_customers(sequelize, DataTypes);

  // Association
  tbl_customers.hasOne(company, {
    foreignKey: "id",
    sourceKey: "company_id",
  });

  return {
    tbl_customers,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
