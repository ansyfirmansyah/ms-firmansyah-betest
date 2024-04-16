const { Kafka, logLevel } = require('kafkajs');

class KafkaConfig {
    constructor() {
        this.kafka = new Kafka({
            logLevel: logLevel.INFO,
            clientId: 'kafka_firmansyah_betest',
            brokers: [process.env.KAFKA_URL],
            ssl: true,
            sasl: {
                username: process.env.KAFKA_USERNAME,
                password: process.env.KAFKA_PASSWORD,
                mechanism: 'plain'
            },
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'user-group' })
    }

    // default function untuk publish ke kafka
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

    // default function untuk subscribe ke kafka
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

// buat instance dan freeze untuk mencegah perubahan properties pada object
const kafkaConfigInstance = Object.freeze(new KafkaConfig());

module.exports = kafkaConfigInstance;