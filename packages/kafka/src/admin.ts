import { Kafka } from "kafkajs";

export const createTopics = async (kafka: Kafka, topics: string[]) => {
  const admin = kafka.admin();

  try {
    await admin.connect();
    console.log("Kafka Admin connected");

    // Check which topics already exist
    const existingTopics = await admin.listTopics();

    // Filter topics that need to be created
    const topicsToCreate = topics
      .filter((topic) => !existingTopics.includes(topic))
      .map((topic) => ({
        topic,
        numPartitions: 3,
        replicationFactor: 3,
      }));

    if (topicsToCreate.length > 0) {
      await admin.createTopics({
        topics: topicsToCreate,
        validateOnly: false,
        timeout: 30000,
      });
      console.log(
        "Created topics: ",
        topicsToCreate.map((t) => t.topic).join(", ")
      );
    } else {
      console.log("All topics already exist");
    }
  } catch (error) {
    console.error("Error creating topics: ", error);
    throw error;
  } finally {
    await admin.disconnect();
    console.log("Kafka Admin disconnected");
  }
};
