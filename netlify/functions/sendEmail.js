require('dotenv').config();
console.log('MAILGUN_API_KEY:', process.env.MAILGUN_API_KEY);
console.log('MAILGUN_DOMAIN:', process.env.MAILGUN_DOMAIN);

const mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

exports.handler = async (event) => {
    try {
        const { subject, name, description } = JSON.parse(event.body);

        const data = {
            from: 'lucasing2254@gmail.com',
            to: 'lucasddsilvaviana@gmail.com',
            subject: subject,
            text: `Nome: ${name}\n\n${description}`
        };

        await mailgun.messages().send(data);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email enviado com sucesso!' }),
        };
    } catch (error) {
        console.error('Erro ao enviar o email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Falha ao enviar o email.' }),
        };
    }
};
