const express = require("express")
const inscriereEvenimentDao = require("../controllers/inscriereEvenimentDAO")

const inscriereEvenimentRouter = express.Router()

inscriereEvenimentRouter.get("/user/:username", inscriereEvenimentDao.getEvents)
inscriereEvenimentRouter.get("/event/:evenimentId", inscriereEvenimentDao.getParticipanti)
inscriereEvenimentRouter.post("/user/:username", inscriereEvenimentDao.inscrieUsername)
inscriereEvenimentRouter.post("/user/:username/event/:evenimentId", inscriereEvenimentDao.inscrieUsernameByEvenimentId)
inscriereEvenimentRouter.delete("/user/:username", inscriereEvenimentDao.stergeUsername)
inscriereEvenimentRouter.delete("/user/:username/event/:evenimentId", inscriereEvenimentDao.stergeUsernameByEvenimentId)
inscriereEvenimentRouter.delete("/user/:username", inscriereEvenimentDao.stergeToateEvenimenteleByUsername)
inscriereEvenimentRouter.delete("/event/:evenimentId", inscriereEvenimentDao.stergeToateEvenimenteleByEvenimentId)

module.exports = inscriereEvenimentRouter;
