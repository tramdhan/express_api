var express = require("express");
var router = express.Router({ mergeParams: true });
const { CustomerController } = require("@/controllers");

var jsonParser = express.json();

router.get("/", jsonParser, CustomerController.getCustomer);

module.exports = router;
