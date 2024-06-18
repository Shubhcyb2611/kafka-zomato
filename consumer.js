const { combineTableNames } = require("sequelize/lib/utils");
const { kafka } = require("./client");

async function init() {
  const consumer = kafka.consumer({ groupId: "user-1" });
  await consumer.connect();

  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `[${topic}] : Partition : ${partition} : message : ${message.toString()}`
      );
    },
  });
}
init();
