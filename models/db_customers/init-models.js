var DataTypes = require("sequelize").DataTypes;
var _tbl_customers = require("./tbl_customers");

function initModels(sequelize) {
  var tbl_customers = _tbl_customers(sequelize, DataTypes);

  return {
    tbl_customers,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
