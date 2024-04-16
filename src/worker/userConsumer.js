const kafka = require('../../config/queue/kafkaConfig');

// buat consumer baru
const consumer = kafka.consumer({
    groupId: 'new-user-group'
});

// consume message dari kafka kemudian update log di mongo db
const run = async () => {
    kafka.consume(process.env.KAFKA_TOPIC, async ({ topic, partition, message }) => {
        console.log('topic>> ', topic);
        console.log('partition>> ', partition);
        console.log('message key>> ', message.key.toString());
        console.log('message value>> ', message.value.toString());
    })
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))

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



