function applyHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
}

function getResponse(successful, message, result) {
    return {
        successful: successful,
        message: message,
        result: result
    }
}

module.exports = {
    getResponse,
    applyHeaders
}
