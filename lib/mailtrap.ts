import { MailtrapClient } from "mailtrap";
;

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
const sendMessage = ({sender}: {
    sender: {
        email: string, 
        name: string,
        subject: string,
        message: string
    }
}) => {

    try{

        client
        .send({
            from: sender,
            to: recipients,
            template_uuid: process.env.TEMPLATE_ID!,
            template_variables: {
                "fromEmail": sender.email,
                "name": sender.name,
                "subject": sender.subject,
                "message": sender.message
            }
        })
        .then(console.log, console.error);
    } catch (error) {
        console.error(error);
    }
}

export default sendMessage;