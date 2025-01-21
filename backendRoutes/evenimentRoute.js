const express = require("express")
const evenimentDao = require("../controllers/evenimentDAO")
const crypto = require("crypto-js")

const evenimentRouter = express.Router()

evenimentRouter.use((req, res, next) => {

	if (req.headers["authorization"]) {

		let token = crypto.AES.decrypt(req.headers["authorization"], "cheie magica").toString(crypto.enc.Utf8)

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
}
)

evenimentRouter.post("/create",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.headers["authorization"], "cheie magica").toString(crypto.enc.Utf8)

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
evenimentDao.createEveniment)
evenimentRouter.get("/getAll", evenimentDao.getEvenimentAll)
evenimentRouter.get("/getById/:id", evenimentDao.getEvenimentById)
evenimentRouter.get("/getByDate/:date", evenimentDao.getEvenimentByDate)
evenimentRouter.get("/getDates", evenimentDao.getDates)
evenimentRouter.put("/update",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.headers["authorization"], "cheie magica").toString(crypto.enc.Utf8)

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
evenimentDao.updateEveniment)
evenimentRouter.delete("/deleteById/:id",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.headers["authorization"], "cheie magica").toString(crypto.enc.Utf8)

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
evenimentDao.deleteEvenimentById)
evenimentRouter.delete("/deleteByDate/:date",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.headers["authorization"], "cheie magica").toString(crypto.enc.Utf8)

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
evenimentDao.deleteEvenimentByDate)
evenimentRouter.delete("/deleteAll",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.headers["authorization"], "cheie magica").toString(crypto.enc.Utf8)

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
evenimentDao.deleteEvenimentAll)
evenimentRouter.delete("/delete",
(req, res, next) => {

	let token = crypto.AES.decrypt(req.headers["authorization"], "cheie magica").toString(crypto.enc.Utf8)

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
evenimentDao.deleteEveniment)

module.exports = evenimentRouter;
