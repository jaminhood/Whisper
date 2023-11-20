
const errorHandler = (err, req, res, next) => {
    const reason = err.message
    res.status(err.errorCode || 500).json({ msg: reason })
}

module.exports = { errorHandler }