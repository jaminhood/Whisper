require("dotenv").config()
const mongoose = require("mongoose")
const app = require("./app")
const { logEvents } = require("./middleware/logger")

const PORT = process.env.PORT || 5000

// Connect to MongoDB
mongoose.set(`strictQuery`, true)
mongoose.connection.once(`open`, () => {
	console.log(`Connected to MongoDB`)
	app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
})

mongoose.connection.on(`error`, err => {
	console.log(err)
	logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, `mongoErrLog.log`)
})
