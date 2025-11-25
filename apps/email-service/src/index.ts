import sendMail from "./utils/nodemailer";
import { createConsumer, createKafkaClient } from "@repo/kafka";

const kafka = createKafkaClient("email-service");
const consumer = createConsumer(kafka, "email-service");
const start = async () => {
  try {
    await consumer.subscribe([
      {
        topicName: "user.created",
        topicHandler: async (message) => {
          const { email, username } = message.value;

          if (email) {
            await sendMail({
              email,
              subject: "Welcome to Tapestry!",
              content: `Welcome ${username}, Your Account has been created`,
            });
          }
        },
      },
      {
        topicName: "order.created",
        topicHandler: async (message) => {
          const { email, amount, status } = message.value;

          if (email) {
            await sendMail({
              email,
              subject: "Order has been created!",
              content: `Hello ${email}, Your order has been created`,
            });
          }
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

start();
