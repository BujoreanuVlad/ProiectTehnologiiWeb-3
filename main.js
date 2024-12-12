const express = require('express');

const cors = require('cors')
const path = require("path");

const sequelize = require('./sequelize');
const mysql = require("mysql2");

const router = express.Router()
const app = express()

const evenimentRouter = require("./backendRoutes/evenimentRoute.js")
const grupEvenimenteRouter = require("./backendRoutes/grupEvenimenteRoute.js")
const participantRouter = require("./backendRoutes/participantRoute.js")
const inscrieriRouter = require("./backendRoutes/inscriereEvenimentRoute.js")

const EvenimentORM = require("./models/eveniment.js")
const GrupEvenimenteORM = require("./models/grupEvenimente.js")
const ParticipantORM = require("./models/participant.js")

GrupEvenimenteORM.hasMany(EvenimentORM, {foreignKey: 'idGrup'})
//EvenimentORM.belongsTo(GrupEvenimenteORM)

EvenimentORM.belongsToMany(ParticipantORM, {through: 'InscriereEveniment'})
ParticipantORM.belongsToMany(EvenimentORM, {through: 'InscriereEveniment'})

app.use(cors())
app.use(express.json());
app.use(express.static("dist"));

const connection = mysql.createConnection({host: "localhost", user: "root", password: ""});
connection.connect((err) => {

	if (err) throw err;

	connection.query('CREATE DATABASE IF NOT EXISTS event_app;', (err, result) => {
		if (err) throw err;
	});
})

sequelize.sync();

app.use("", router)
app.use("/eveniment", evenimentRouter)
app.use("/grupEvenimente", grupEvenimenteRouter)
app.use("/participant", participantRouter)
app.use("/inscrieri", inscrieriRouter)

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "dist/index.html"));
})

app.listen(3000, () => {console.log("Listening on port:", 3000)})

app.get("/resetDB", async (req, res) => {
    try {
        await sequelize.sync({ force: true });
        res.status(200).send({ message: "Baza de date a fost creata!" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error });
    }
});


