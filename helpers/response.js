class _response {
    sendResponse = async (res, data) => {
        try {
            if (data.code) {
                res.status(data.code)

                delete data.code

                res.send(data)
                return true 
            }

            res.status(data && data.status ? 208 : 400)
            res.send(data)
            return true
        } catch (error) {
            console.error('sendResponse response helper Error: ', error)
            
            res.status(400).send(data)
            return false
        }
    }
}

module.exports = new _response()