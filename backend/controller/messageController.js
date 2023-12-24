const asyncWrapper = require("../lib/asyncWrapper.js")
const Message = require("../model/messageModel.js")
const BadRequestError = require("../errors/badRequest.js")

const getMessages = asyncWrapper(async (req, res) => {
	const totalDocuments = await Message.countDocuments()

	const LIMIT = 5
	let messages = Message.find()
	let { page } = req.query

	if (page) {
		if (page < 1) {
			res.status(403).json({ success: false, message: `Page not found` })
		} else {
			page = Number(page)
		}
	} else {
		page = 1
	}

	const SKIP = (page - 1) * LIMIT
	messages = await Message.find().skip(SKIP).limit(LIMIT)
	res.status(200).json({ success: true, messages, hasNextPage: totalDocuments > SKIP + LIMIT, hasPrevPage: page > 1, count: messages.length })
})

const postMessage = asyncWrapper(async (req, res) => {
	const { message } = req.body

	if (!message) {
		throw new BadRequestError("message field is required.")
	}

	//add new message to database.
	let msg = new Message({ message, time: Date.now() })
	msg = await msg.save()

	res.status(200).json({ msg })
})

module.exports = { getMessages, postMessage }
