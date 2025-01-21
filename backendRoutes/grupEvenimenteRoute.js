const express = require("express")
const crypto = require("crypto-js")
const grupEvenimenteDao = require("../controllers/grupEvenimenteDAO")

const grupEvenimenteRouter = express.Router()

grupEvenimenteRouter.use((req, res, next) => {

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
},

(req, res, next) => {

	let token = crypto.AES.decrypt(req.headers["authorization"], "cheie magica").toString(crypto.enc.Utf8)

	let fields = token.split(";")

	if (fields.length !== 2) {
		res.status(401).send("Error. Invalid user.")
	}
	else {
		next();
	}
}
)

grupEvenimenteRouter.post("/create",
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
grupEvenimenteDao.createGrupEvenimente)
grupEvenimenteRouter.get("/getAll", grupEvenimenteDao.getGrupEvenimenteAll)
grupEvenimenteRouter.get("/get/:id", grupEvenimenteDao.getGrupEvenimenteById)
grupEvenimenteRouter.get("/getEvents/:id", grupEvenimenteDao.getEvenimenteById)
grupEvenimenteRouter.put("/update",
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
grupEvenimenteDao.updateGrupEvenimente)
grupEvenimenteRouter.delete("/delete/:id",
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
grupEvenimenteDao.deleteGrupEvenimenteById)
grupEvenimenteRouter.delete("/deleteAll",
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
grupEvenimenteDao.deleteGrupEvenimenteAll)
grupEvenimenteRouter.delete("/delete",
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
grupEvenimenteDao.deleteGrupEvenimente)

module.exports = grupEvenimenteRouter;
