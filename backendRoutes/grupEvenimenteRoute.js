const express = require("express")
const grupEvenimenteDao = require("../controllers/grupEvenimenteDAO")

const grupEvenimenteRouter = express.Router()

grupEvenimenteRouter.post("/create", grupEvenimenteDao.createGrupEvenimente)
grupEvenimenteRouter.get("/getAll", grupEvenimenteDao.getGrupEvenimenteAll)
grupEvenimenteRouter.get("/get/:id", grupEvenimenteDao.getGrupEvenimenteById)
grupEvenimenteRouter.get("/getEvents/:id", grupEvenimenteDao.getEvenimenteById)
grupEvenimenteRouter.put("/update", grupEvenimenteDao.updateGrupEvenimente)
grupEvenimenteRouter.delete("/delete/:id", grupEvenimenteDao.deleteGrupEvenimenteById)
grupEvenimenteRouter.delete("/deleteAll", grupEvenimenteDao.deleteGrupEvenimenteAll)
grupEvenimenteRouter.delete("/delete", grupEvenimenteDao.deleteGrupEvenimente)

module.exports = grupEvenimenteRouter;
