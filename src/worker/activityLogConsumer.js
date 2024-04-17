const kafka = require('../../config/queue/kafkaConfig');
const ActivityLogRepository = require('../repositories/activityLogRepository');

const activityLogRepository = new ActivityLogRepository();

// consume message dari kafka kemudian update log di mongo db
const run = async () => {
    kafka.consume(process.env.KAFKA_TOPIC, async (topic, partition, message) => {
        if (message.key.toString() === "activity-log") {
            const data = JSON.parse(message.value.toString());
            await activityLogRepository.create(data);
        }
    })
}

run().catch(e => console.error(`[Consumer Error] ${e.message}`, e))



