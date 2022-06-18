const { QueryTypes, Op } = require("sequelize");
const Sequelize = require("sequelize");
let databases = require("@/databases");
var initModels = require("@/models/db_customers/init-models");

let config = require("../config");

const sequelize = new Sequelize(
  process.env.NAME_DATABASE,
  process.env.NAME_USERNAME,
  process.env.NAME_PASSWORD,
  config.databases.db_customers
);

var model = initModels(sequelize);

// This Controller manages requests for OD User functions

module.exports = {
  getCustomer(req, res, next) {
    let customer_id = req.params.customer_id;
    model.tbl_authorized_users
      .findAll({
        where: {
          customer_id: customer_id,
        },
        attributes: [
          "email",
          [Sequelize.fn("CONCAT", Sequelize.col("first_name"), Sequelize.col("last_name")), "fullname"],
        ],
      })
      .then((resp) => {
        res.send(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  addCustomer(req, res, next) {
    model.tbl_customers
      .create(req.body)
      .then(res.status(200).send({ status: 200 }))
      .catch((error) => {
        console.log(error);
      });
  },

  updateUser(req, res, next) {
    let id = req.params.id;
    model.tbl_authorized_users
      .update(req.body, {
        where: {
          id: id,
        },
      })
      .then(res.status(200).send({ status: 200 }))
      .catch((error) => {
        console.log(error);
      });
  },
};
