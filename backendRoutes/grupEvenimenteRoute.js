const express = require("express")
const grupEvenimenteDao = require("../controllers/grupEvenimenteDAO")

const grupEvenimenteRouter = express.Router()

grupEvenimenteRouter.use((req, res, next) => {

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

grupEvenimenteRouter.post("/create", grupEvenimenteDao.createGrupEvenimente)
grupEvenimenteRouter.get("/getAll", grupEvenimenteDao.getGrupEvenimenteAll)
grupEvenimenteRouter.get("/get/:id", grupEvenimenteDao.getGrupEvenimenteById)
grupEvenimenteRouter.get("/getEvents/:id", grupEvenimenteDao.getEvenimenteById)
grupEvenimenteRouter.put("/update", grupEvenimenteDao.updateGrupEvenimente)
grupEvenimenteRouter.delete("/delete/:id", grupEvenimenteDao.deleteGrupEvenimenteById)
grupEvenimenteRouter.delete("/deleteAll", grupEvenimenteDao.deleteGrupEvenimenteAll)
grupEvenimenteRouter.delete("/delete", grupEvenimenteDao.deleteGrupEvenimente)

module.exports = grupEvenimenteRouter;
