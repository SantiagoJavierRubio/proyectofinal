import twilio from 'twilio';
import 'dotenv/config';

const accountSID = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

const client = twilio(accountSID, authToken);

const sendMessage = async (options) => {
  try {
    const message = await client.messages.create(options);
    return message;
  } catch (err) {
    return { error: err.message };
  }
};

export default sendMessage;
