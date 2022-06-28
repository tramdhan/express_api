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
  mail: {
    host: "localhost",
    port: process.env.SMTP_PORT, // e.g.: localhost = 25, prod = 587
    tls: process.env.SMTP_TLS, // e.g.: localhost = false, prod = true
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PWORD,
  },

  mailTemplate: {
    start:
      "<html><div style='font-size: 14px; margin-left: 50px; margin-right: 50px; padding-left: 15px; padding-right: 15px; padding-bottom: 15px; border-style: solid; border-width: 1px; border-color: 'gray';><br /><br />",
    end: "</div></div></html>",
  },
};
