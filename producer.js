const { Partitioners } = require("kafkajs");
const { kafka } = require("./client");

async function init() {
  const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");

  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        partition: 0,
        key: "location-update",
        value: JSON.stringify({ name: "Jack Jones", location: "north" }),
      },
    ],
  });
  await producer.disconnect();
}

init();
