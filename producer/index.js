console.log("Producer started...")

import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

const stream = Kafka.Producer.createWriteStream(
    { 'metadata.broker.list': 'localhost:9092' },
    {},
    { topic: 'test' }
);

function getRandomCategory() {
    const valids = ['CAT', 'DOG'];
    return valids[Math.floor(Math.random() * valids.length)];
}

function getRandomName() {
    const valids = ['Torkil', 'Eric', 'Ole', 'Petter', 'Heidi'];
    return valids[Math.floor(Math.random() * valids.length)];
}

function queueMessage() {
    const category = getRandomCategory();
    const name = getRandomName();
    console.log(category, name);
    const event = { category: category, name: name }
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