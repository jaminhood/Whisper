const express = require("express")
const router = express.Router()
const messages = require("../controller/messageController")

router.route(`/`).get(messages.getMessages).post(messages.postMessage)

module.exports = router
