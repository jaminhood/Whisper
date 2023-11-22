const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const { join } = require('path')
require("dotenv").config({ path: join(__dirname, "..", ".env") })

const path = require("path")
const { errorHandler } = require('./middlewares/errorHandler.js')

const app = express()
// routes
const routes = require("./routes/messageRoutes")

app.use(cors(corsOptions))
app.use(express.json())

app.use("/", express.static(path.join(__dirname, "public")))
app.use("/", routes)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

// Connect to MongoDB
mongoose.set("strictQuery", true)
mongoose.connect(process.env.DATABASE_URI)
	.catch(err => {
		const reason = process.env.NODE_ENV === 'development' ? err.stack : err.message
		console.error(reason)
	})
mongoose.connection.once("open", () => {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
})
