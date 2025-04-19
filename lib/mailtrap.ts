'use server'
import { MailtrapClient } from "mailtrap";


const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN!,
});

const sender = {
  email: "hello@geninvoices.tanmay.space",
  name: "important message",
};
const recipients = [
  {
    email: "tanmay.bansal20@gmail.com",
  }
];
const sendMessage = async ({message}: {
    message: {
        email: string, 
        name: string,
        subject: string,
        message: string
    }
}) => {

    try{

        await client
        .send({
            from: sender,
            to: recipients,
            template_uuid: process.env.TEMPLATE_ID!,
            template_variables: {
                "fromEmail": message.email,
                "name": message.name,
                "subject": message.subject,
                "message": message.message
            }
        })
        
        return {
            success: "Message sent successfully"
        }
    } catch (error) {
        console.error(error);
        return {
            error: "Failed to send message"
        }
    }
}

export default sendMessage;