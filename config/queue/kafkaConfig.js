const { Kafka, logLevel } = require('kafkajs');
const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

class KafkaConfig {
    constructor() {
        this.kafka = new Kafka({
            logLevel: logLevel.INFO,
            clientId: 'kafka_firmansyah_betest',
            brokers: [process.env.KAFKA_URL],
            ssl,
            sasl,
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'user-group' })
    }

    async produce(topic, messages) {
        try {
            await this.producer.connect();
            return await this.producer.send({
                topic: topic,
                messages: messages
            });
        } catch (error) {
            console.error(error);
        } finally {
            await this.producer.disconnect();
        }
    }

    async consume(topic, callback) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: topic, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    callback(topic, partition, message);
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

}

const kafkaConfigInstance = Object.freeze(new KafkaConfig());

module.exports = kafkaConfigInstance;