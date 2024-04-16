const kafka = require('../../config/queue/kafkaConfig');
const ActivityLogRepository = require('../repositories/activityLogRepository');

const activityLogRepository = new ActivityLogRepository();

// consume message dari kafka kemudian update log di mongo db
const run = async () => {
    kafka.consume(process.env.KAFKA_TOPIC, async (topic, partition, message) => {
        const data = JSON.parse(message.value.toString());
        await activityLogRepository.create(data);
    })
}

run().catch(e => console.error(`[Consumer Error - ${groupId}] ${e.message}`, e))

// catch error kemudian close koneksi
const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
errorTypes.forEach(type => {
    process.on(type, async e => {
        try {
            console.log(`process.on ${type}`)
            console.error(e)
            await consumer.disconnect()
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
})
signalTraps.forEach(type => {
    process.once(type, async () => {
        try {
            await consumer.disconnect()
        } finally {
            process.kill(process.pid, type)
        }
    })
})



