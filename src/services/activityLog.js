const requestIP = require('request-ip');
const kafka = require('../../config/queue/kafkaConfig');

const service = {};

// function default untuk send message ke kafka untuk respon non error
service.produceLog = async (req, data) => {
    const ipAddress = requestIP.getClientIp(req);
    const payload = {
        ipAddress,
        action: data?.action,
        username: data?.username,
        method: req.method,
		originalUrl: req.originalUrl,
        collection: data?.collection,
        idDoc: data?.data?.["id"],
        doc: data?.data?.["_doc"]
    }
    await kafka.produce(process.env.KAFKA_TOPIC, [{
        key: "activity-log",
        value: JSON.stringify(payload)
    }])
}

module.exports = service;