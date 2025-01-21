const express = require("express")
const inscriereEvenimentDao = require("../controllers/inscriereEvenimentDAO")

const inscriereEvenimentRouter = express.Router()

inscriereEvenimentRouter.use((req, res, next) => {

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

inscriereEvenimentRouter.get("/user/:username",
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
inscriereEvenimentDao.getEvents)

inscriereEvenimentRouter.get("/event/:evenimentId", 
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
inscriereEvenimentDao.getParticipanti)

inscriereEvenimentRouter.post("/user/:username", 
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
inscriereEvenimentDao.inscrieUsername)

inscriereEvenimentRouter.post("/user/:username/event/:evenimentId",
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
inscriereEvenimentDao.inscrieUsernameByEvenimentId)

inscriereEvenimentRouter.post("/user/:username/event/:evenimentId/codAcces/:codAcces", inscriereEvenimentDao.confirmaPrezenta)

inscriereEvenimentRouter.delete("/user/:username",
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
inscriereEvenimentDao.stergeUsername)

inscriereEvenimentRouter.delete("/user/:username/event/:evenimentId",
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
inscriereEvenimentDao.stergeUsernameByEvenimentId)

inscriereEvenimentRouter.delete("/user/:username",
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
inscriereEvenimentDao.stergeToateEvenimenteleByUsername)

inscriereEvenimentRouter.delete("/event/:evenimentId",
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
inscriereEvenimentDao.stergeToateEvenimenteleByEvenimentId)

module.exports = inscriereEvenimentRouter;
