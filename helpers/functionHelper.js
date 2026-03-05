function sendRes(res, status, message, data = null) {
    const payload = {
        status,
        message
    }

    if (data !== null) {
        payload.data = data
    }

    return res.status(status).json(payload)
}

module.exports={sendRes}