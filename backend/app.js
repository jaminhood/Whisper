const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
require("dotenv").config()
const path = require("path")

const app = express()
// routes
const routes = require("./routes/messageRoutes")

app.use(cors(corsOptions))
app.use(express.json())

app.use("/", express.static(path.join(__dirname, "public")))
app.use("/", routes)

const PORT = process.env.PORT || 5000

// Connect to MongoDB
mongoose.set("strictQuery", true)
mongoose.connection.once("open", () => {
	app.listen(PORT, () => console.log(chalk.green(`Server running on port ${PORT}...`)))
})
