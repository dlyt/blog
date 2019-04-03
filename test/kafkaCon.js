'use strict';

var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Offset = kafka.Offset;
var Client = kafka.KafkaClient;
var topic = 'estest';

var client = new Client({ kafkaHost: 'localhost:9092' });
var topics = [{ topic: topic, partition: 0 }];
var options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

var consumer = new Consumer(client, topics, options);
var offset = new Offset(client);

// consumer.setOffset('estest', 1, 1);

consumer.on('message', function (message) {
    console.log(111)
    console.log(message);
    setTimeout(() => {
        consumer.commit((error, data) => {
            console.log(data)
        });
    }, 0);
    // consumer.commit(true, function(err, data) {
    //     console.log(data)
    // });
});

consumer.on('error', function (err) {
    console.log('error', err);
});

/*
* If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
*/
consumer.on('offsetOutOfRange', function (topic) {
    topic.maxNum = 2;
    offset.fetch([topic], function (err, offsets) {
        if (err) {
            return console.error(err);
        }
        console.log(1)
        var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
        // consumer.setOffset(topic.topic, topic.partition, min);
    });
});