const express = require("express")
const participantDao = require("../controllers/participantDAO")

const participantRouter = express.Router()

participantRouter.use((req, res, next) => {

	if (req.body["token"]) {

		let token = crypto.AES.decrypt(req.body["token"], "cheie magica").toString(crypto.enc.Utf8)

		if (token.length > ";SECURITY_T0KEN".length) {
			
			if (token.substring(token.length - ";SECURITY_T0KEN".length) === ";SECURITY_T0KEN") {
				next();
			}
			else {
				res.status(401).send("Error. Please log in.")
			}
		}
		else {
			res.status(401).send("Error. Please log in.")
		}
	}
	else {
		res.status(401).send("Error. Please log in.")
	}
},

)

participantRouter.post("/create",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.body["token"], "cheie magica").toString(crypto.enc.Utf8)

	let fields = token.split(";")

	if (fields.length !== 2) {
		res.status(401).send("Error. Invalid user.")
	}
	else {

		let user = fields[0]

		if (user === "admin") {
			next();
		}
		else {
			res.status(401).send("Error. Invalid user.")
		}
	}
},
participantDao.createParticipant)

participantRouter.get("/getAll", 
(req, res, next) => {

	let token = crypto.AES.decrypt(req.body["token"], "cheie magica").toString(crypto.enc.Utf8)

	let fields = token.split(";")

	if (fields.length !== 2) {
		res.status(401).send("Error. Invalid user.")
	}
	else {

		let user = fields[0]

		if (user === "admin") {
			next();
		}
		else {
			res.status(401).send("Error. Invalid user.")
		}
	}
},
participantDao.getParticipantAll)

participantRouter.get("/getByUsername/:username",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.body["token"], "cheie magica").toString(crypto.enc.Utf8)

	let fields = token.split(";")

	if (fields.length !== 2) {
		res.status(401).send("Error. Invalid user.")
	}
	else {

		let user = fields[0]

		if (user === "admin" || user === req.params.username) {
			next();
		}
		else {
			res.status(401).send("Error. Invalid user.")
		}
	}
},
participantDao.getParticipantByUsername)

participantRouter.get("/getDates/:username",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.body["token"], "cheie magica").toString(crypto.enc.Utf8)

	let fields = token.split(";")

	if (fields.length !== 2) {
		res.status(401).send("Error. Invalid user.")
	}
	else {

		let user = fields[0]

		if (user === "admin" || user === req.params.username) {
			next();
		}
		else {
			res.status(401).send("Error. Invalid user.")
		}
	}
},
participantDao.getDatesByUsername)

participantRouter.put("/update",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.body["token"], "cheie magica").toString(crypto.enc.Utf8)

	let fields = token.split(";")

	if (fields.length !== 2) {
		res.status(401).send("Error. Invalid user.")
	}
	else {

		let user = fields[0]

		if (user === "admin") {
			next();
		}
		else if (req.body["username"]) {
			if (req.body["username"] === user) {
				next()
			}
			else {
				res.status(401).send("Error. Invalid user.")
			}
		}
		else {
			res.status(401).send("Error. Invalid user.")
		}
	}
},
participantDao.updateParticipant)

participantRouter.delete("/deleteByUsername/:username",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.body["token"], "cheie magica").toString(crypto.enc.Utf8)

	let fields = token.split(";")

	if (fields.length !== 2) {
		res.status(401).send("Error. Invalid user.")
	}
	else {

		let user = fields[0]

		if (user === "admin" || user === req.params.username) {
			next();
		}
		else {
			res.status(401).send("Error. Invalid user.")
		}
	}
},
participantDao.deleteParticipantByUsername)

participantRouter.delete("/deleteAll",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.body["token"], "cheie magica").toString(crypto.enc.Utf8)

	let fields = token.split(";")

	if (fields.length !== 2) {
		res.status(401).send("Error. Invalid user.")
	}
	else {

		let user = fields[0]

		if (user === "admin") {
			next();
		}
		else {
			res.status(401).send("Error. Invalid user.")
		}
	}
},
participantDao.deleteParticipantAll)

participantRouter.delete("/delete",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.body["token"], "cheie magica").toString(crypto.enc.Utf8)

	let fields = token.split(";")

	if (fields.length !== 2) {
		res.status(401).send("Error. Invalid user.")
	}
	else {

		let user = fields[0]

		if (user === "admin") {
			next();
		}
		else if (req.body["username"]) {
			if (req.body["username"] === user) {
				next()
			}
			else {
				res.status(401).send("Error. Invalid user.")
			}
		}
		else {
			res.status(401).send("Error. Invalid user.")
		}
	}
},
participantDao.deleteParticipant)

module.exports = participantRouter;
