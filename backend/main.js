const express = require('express');

const cors = require('cors')
const path = require("path");

const sequelize = require('./sequelize');
const mysql = require("mysql2");

const router = express.Router()
const app = express()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


const evenimentRouter = require("./backendRoutes/evenimentRoute.js")
const grupEvenimenteRouter = require("./backendRoutes/grupEvenimenteRoute.js")
const participantRouter = require("./backendRoutes/participantRoute.js")
const inscrieriRouter = require("./backendRoutes/inscriereEvenimentRoute.js")
const authRouter = require("./backendRoutes/authRoute.js")

const EvenimentORM = require("./models/eveniment.js")
const GrupEvenimenteORM = require("./models/grupEvenimente.js")
const ParticipantORM = require("./models/participant.js")
const InscriereEvenimentORM = require("./models/inscriereEveniment.js")

GrupEvenimenteORM.hasMany(EvenimentORM, {foreignKey: 'idGrup'})
//EvenimentORM.belongsTo(GrupEvenimenteORM)

EvenimentORM.belongsToMany(ParticipantORM, {through: InscriereEvenimentORM})
ParticipantORM.belongsToMany(EvenimentORM, {through: InscriereEvenimentORM})

app.use(cors())
app.use(express.json());
app.use(express.static("dist"));


const connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USERNAME, password: process.env.DB_PASSWORD});
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
app.use("/auth", authRouter)

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "dist/index.html"));
})

router.get("/user", (req, res) => {
	res.sendFile(path.join(__dirname, "dist/index.html"));
})

router.get("/admin", (req, res) => {
	res.sendFile(path.join(__dirname, "dist/index.html"));
})

app.get("/resetDB", async (req, res) => {
    try {
        await sequelize.sync({ force: true });
        res.status(200).send({ message: "Baza de date a fost creata!" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error });
    }
});

app.listen(3000, () => {console.log("Server started on: " + "http://localhost:3000")})

