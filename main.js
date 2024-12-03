const express = require('express');

const cors = require('cors')
const path = require("path");

const router = express.Router()
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.static("dist"));

app.use("", router)

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "dist/index.html"));
})

app.listen(3000, () => {console.log("Server started on: " + "http://localhost:3000")})
