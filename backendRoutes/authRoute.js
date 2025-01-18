const express = require("express")
const crypto = require('crypto-js')
const participantORM = require("../models/participant.js")
const participantDao = require("../controllers/participantDAO.js")

const authRouter = express.Router()

authRouter.post("/login", async (req, res) => {

	let username = req.body["username"]
	let password = req.body["password"]

	console.log("|" + password + "|")
	
	if (username === null || password === null) {
		res.status(400).send("Error. Empty username or password")
	}

	const user = await participantORM.findByPk(username)

	if (user === null) {
		res.status(404).send()
	}

	else {

		let decryptedPassword = crypto.AES.decrypt(user["password"], "cheie magica").toString(crypto.enc.Utf8)

		if (decryptedPassword === password) {
			res.status(200).json({'ok': true, 'token': crypto.AES.encrypt(username+";SECURITY_T0KEN", "cheie magica").toString()})
		}
		else {
			res.status(401).json({'ok': false})
		}

		console.log(user)
	}
})

authRouter.post("/register", async (req, res) => {

	await participantDao.createParticipant(req, res)
})

module.exports = authRouter;
