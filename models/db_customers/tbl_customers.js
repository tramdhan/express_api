const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "tbl_customers",
    {
      customer_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      cust_status: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      fname: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      lname: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      company_name: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(2),
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING(7),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "tbl_customers",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "customer_id" }],
        },
      ],
    }
  );
};
