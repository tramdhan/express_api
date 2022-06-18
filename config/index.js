module.exports = {
  //https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
  databases: {
    db_customers: {
      database: process.env.NAME_DATABASE,
      username: process.env.NAME_USERNAME,
      password: process.env.NAME_PASSWORD,
      dialect: "mysql",
      host: process.env.NAME_HOST,
      port: process.env.NAME_PORT,
    },
  },

  //https://www.npmjs.com/package/redis#options-object-properties
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },

  //https://github.com/eleith/emailjs#emailserverconnectoptions
  mail: {},
};
