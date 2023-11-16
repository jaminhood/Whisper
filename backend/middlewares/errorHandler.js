
const errorHandler = (err, req, res, next) => {
    const reason = err.message
    res.json({ msg: reason })
}

module.exports = { errorHandler }