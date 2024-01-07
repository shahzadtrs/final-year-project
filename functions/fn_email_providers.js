exports = async function (arg) {
    // const { SENDGRID_API_KEY, MAILGUN_API_KEY, MAILGUN_DOMAIN, ONESIGNAL_APP_ID, ONESIGNAL_API_KEY } = context.environment.values
    
    // ENV Variables
    const {GMAIL_AUTH_USER, GMAIL_AUTH_PASS, GMAIL_FROM} = context.environment.values


    const emailProviders = {
        gmail: {
            user: GMAIL_AUTH_USER, // replace with your email address
            pass: GMAIL_AUTH_PASS, // replace with your email password or an app password if using 2-factor authentication
        },
        // sendgrid: {
        //     apiKey: SENDGRID_API_KEY,
        // },
        // mailgun: {
        //     apiKey: MAILGUN_API_KEY,
        //     domain: MAILGUN_DOMAIN,
        // },
        // onesignal: {
        //     appId: ONESIGNAL_APP_ID,
        //     apiKey: ONESIGNAL_API_KEY,
        // },
        // Add more providers as needed
    };
    return emailProviders
};