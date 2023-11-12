const express = require("express")
require("dotenv").config()
const path = require("path")

const app = express()
// routes
const routes = require("./routes")

app.use(express.json())

app.use("/", express.static(path.join(__dirname, "public")))
app.use("/", routes)

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log("Server is running")
})
