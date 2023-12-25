const asyncHandler = require("express-async-handler")
const Message = require("../model/messageModel.js")

const getMessages = asyncHandler(async (req, res) => {
	const totalDocuments = await Message.countDocuments()

	const LIMIT = 5
	let messages = Message.find()
	let { page } = req.query

	page ? (page < 1 ? res.status(403).json({ success: false, message: `Page not found` }) : (page = Number(page))) : (page = 1)

	const SKIP = (page - 1) * LIMIT
	messages = await Message.find().sort({ _id: -1 }).skip(SKIP).limit(LIMIT)
	res.status(200).json({ success: true, messages, hasNextPage: totalDocuments > SKIP + LIMIT, hasPrevPage: page > 1, count: messages.length })
})

const postMessage = asyncHandler(async (req, res) => {
	const { message } = req.body

	let msg = new Message({ message })
	msg = await msg.save()

	res.status(200).json({ success: true, msg })
})

module.exports = { getMessages, postMessage }
