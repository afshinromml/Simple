const express = require("express");
const router = express.Router();
// const { check, validationResult } = require("express-validator/check");
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
var fs = require('fs');
const config = require('config');
const authorization = require('../../../middleware/authorization')
const Users = require('../../../models/Users')

const nodemailer = require('nodemailer');
// POST api/sendMail
router.post(
	'/',authorization,
	
	async (req, res) => {
console.log(req.user.id)

		try {
			console.log("this is = ", req)
			user = await Users.findOne(
				  {_id:req.user.id},
			  )

            let emailCustomer = (user.email)
            let transporter = nodemailer.createTransport({
				service: 'gmail',
				port: 465,
				secure: true, // use TLS
                auth: {
					user: 'Your email address',
					pass: "Your Password"
				}
				,
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
              });

			transporter.verify((error, success) => {
				if (error) {
					console.log(error);
				} else {
					console.log('All works fine');
				}
			});
			const name = user.name;
			const email = user.email;
			const messageHtml = "Download Your Certificate";
			const subject = "AMA Certificate";
			var mail = {
				from: name,
				to: email,
				subject: subject,
				html: messageHtml,
				attachments: [

					{ filename: 'A.txt', path: 'F:/pdf/A.txt' }

				]

			};
			await transporter.sendMail(mail, (err, data) => {
				if (err) {
					res.json({
						msg: 'fail'
					})
				} else {
					res.json({
						msg: 'success'
					})
				}
			});
			//	res.send("Email sent");
		} catch (error) {
			//res.send(error.message)
			console.error(error.message);
			res.status(500).send("Server error");
		}
	}
);
module.exports = router;
