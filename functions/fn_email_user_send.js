exports = async function (subject, htmlContent, email) {
    console.log("fn_email_user_send", email)
    const {GMAIL_FROM} = context.environment.values
     const provider = 'gmail';
    const mailOptions = {
        from: GMAIL_FROM,
        to: email ? email : context.user.custom_data.email,
        subject,
        html: htmlContent,
    };

    try {
        await context.functions.execute('fn_email_send', provider, mailOptions);
        return { status: 200, message: "EMAIL_SENT" };
    } catch (error) {
        return { status: 502, message: "EMAIL_SENT_FAILED" , error};
    }


};