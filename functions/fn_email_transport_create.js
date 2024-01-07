exports = async function (provider) {
    const nodemailer = require('nodemailer')
    const emailProviders = await context.functions.execute('fn_email_providers')
    switch (provider) {
        case 'gmail':
            return nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: emailProviders.gmail.user,
                    pass: emailProviders.gmail.pass,
                },
            });

        case 'sendgrid':
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: 'apikey',
                    pass: emailProviders.sendgrid.apiKey,
                },
            });
        case 'mailgun':
            return nodemailer.createTransport({
                host: 'smtp.mailgun.org',
                port: 587,
                auth: {
                    user: 'postmaster',
                    pass: emailProviders.mailgun.apiKey,
                },
            });
        case 'onesignal':
            // Assuming you want to use OneSignal for email notifications, you'll need to adapt this based on OneSignal's email integration.
            // You may need to use a different library or method for sending emails via OneSignal.
            // Consult OneSignal's documentation for email sending.
            // Here, we are just returning a placeholder transporter.
            return nodemailer.createTransport({
                service: 'onesignal',
                auth: {
                    user: 'apikey',
                    pass: emailProviders.onesignal.apiKey,
                },
            });
        // Add more cases for other providers
        default:
            throw new Error('Invalid email provider');
    }
};