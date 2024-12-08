const express = require('express');

const cors = require('cors')
const path = require("path");
const sequelize = require('./sequelize');

const router = express.Router()
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.static("dist"));

app.use(
	express.urlencoded({
	  extended: true,
	})
  );

app.use("", router)

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


