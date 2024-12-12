const express = require("express")
const participantDao = require("../controllers/participantDAO")

const participantRouter = express.Router()

participantRouter.post("/create", participantDao.createParticipant)
participantRouter.get("/getAll", participantDao.getParticipantAll)
participantRouter.get("/getByUsername/:username", participantDao.getParticipantByUsername)
participantRouter.get("/getDates/:username", participantDao.getDatesByUsername)
participantRouter.put("/update", participantDao.updateParticipant)
participantRouter.delete("/deleteByUsername/:username", participantDao.deleteParticipantByUsername)
participantRouter.delete("/deleteAll", participantDao.deleteParticipantAll)
participantRouter.delete("/delete", participantDao.deleteParticipant)

module.exports = participantRouter;
