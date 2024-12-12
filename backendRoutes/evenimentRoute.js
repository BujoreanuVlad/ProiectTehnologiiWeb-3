const express = require("express")
const evenimentDao = require("../controllers/evenimentDAO")

const evenimentRouter = express.Router()

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
