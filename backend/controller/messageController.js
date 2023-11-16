const asyncWrapper = require('../lib/asyncWrapper.js')
const Message = require('../model/messageModel.js')
const mock_data = require('../mock_data.json')

const getMessages = asyncWrapper(async (req, res) => {

    //seed database
    await Message.deleteMany()
    await Message.insertMany(mock_data)

    const totalDocuments = await Message.countDocuments()

    const LIMIT = 5
    let messages = Message.find()
    let { page } = req.query

    if (page) {
        //req.query.page is a string, so we cast to a number.
        page = Number(page)
    } else {
        page = 1
    }

    const SKIP = (page - 1) * LIMIT
    messages = await messages.skip(SKIP).limit(LIMIT)
    res.json({ messages, hasNextPage: totalDocuments > (SKIP + LIMIT), hasPrevPage: page > 1, count: messages.length })

})

const postMessage = asyncWrapper(async (req, res) => {

    const { message } = req.body

    if (!message) {
        throw new Error('message field is required.')
    }

    //add new message to database.
    let msg = new Message({ message })
    msg = await msg.save()

    res.json(msg)

})


module.exports = { getMessages, postMessage }