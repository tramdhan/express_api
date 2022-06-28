var express = require("express");
var router = express.Router({ mergeParams: true });
const { SMTPClient } = require("emailjs");

const mailConfig = require("@/config");

/** Mailer Service Route */

router.post("/", async (req, res) => {
  var bodyContent = mailConfig.mailTemplate.start + req.body.content + mailConfig.mailTemplate.end;

  let msg = {
    subject: req.body.subject,
    from: req.body.from,
    to: req.body.to, // array of recipients
    cc: req.body.cc || "", // cc may be optional
    bcc: ["supportmailbox@example.com"], // audit trail
    attachment: [
      // required structure of the email body
      {
        data: bodyContent,
        alternative: true,
      },
    ],
  };

  var client = new SMTPClient(mailConfig.mail);

  if (msg.to && msg.from && msg.subject) {
    client.send(msg, (err) => {
      console.log(err || msg);
    });
    res.send("Email Delivered");
  } else {
    res.send("Missing From, To or Subject");
  }
});

module.exports = router;
