console.log("Producer started...")

import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

const stream = Kafka.Producer.createWriteStream(
    { 'metadata.broker.list': 'localhost:9092' },
    {},
    { topic: 'test' }
);

function queueMessage() {
    const event = { category: 'DOG', name: 'Basko' }
    const success = stream.write(eventType.toBuffer(event));
    if (success) {
        console.log('message wrote to stream...');
    } else {
        console.log('something went wrong...');
    }
}

setInterval(() => {
    queueMessage();
}, 3000);