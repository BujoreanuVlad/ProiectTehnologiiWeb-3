const express = require("express")
const evenimentDao = require("../controllers/evenimentDAO")
const crypto = require("crypto-js")

const evenimentRouter = express.Router()

evenimentRouter.use((req, res, next) => {

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
}
)

evenimentRouter.post("/create", evenimentDao.createEveniment)
evenimentRouter.get("/getAll", evenimentDao.getEvenimentAll)
evenimentRouter.get("/getById/:id", evenimentDao.getEvenimentById)
evenimentRouter.get("/getByDate/:date", evenimentDao.getEvenimentByDate)
evenimentRouter.get("/getDates", evenimentDao.getDates)
evenimentRouter.put("/update", evenimentDao.updateEveniment)
evenimentRouter.delete("/deleteById/:id", evenimentDao.deleteEvenimentById)
evenimentRouter.delete("/deleteByDate/:date", evenimentDao.deleteEvenimentByDate)
evenimentRouter.delete("/deleteAll", evenimentDao.deleteEvenimentAll)
evenimentRouter.delete("/delete", evenimentDao.deleteEveniment)

module.exports = evenimentRouter;
