exports = async function (email,templateType) {
    try {
             // Create a custom user data document for the user
            const mdb = context.services.get("mongodb-atlas");
            const usersCollection = mdb.db("FYP-Backend").collection("users");
            let tempType= templateType||"reset_password_template"
            // arg(fn_name, type)
            const template = await context.functions.execute('fn_email_templates_get', tempType)
            
            
            const verificationCode = await context.functions.execute('fn_generate_random_code')

            // Set the verification code expiry (e.g., 5 minutes from now)
            const verificationCodeExpiry = new Date();
            verificationCodeExpiry.setMinutes(verificationCodeExpiry.getMinutes() + 10); // Expiry time in 10 minutes

            // Format the expiry time in a human-readable format
            const formattedExpiryTime = verificationCodeExpiry.toLocaleString('en-US', { timeZone: 'UTC' });

            // Rendered with dynamic values
            const newUpdatedTemplate = template.replace('[VERIFICATION_CODE]', verificationCode).replace('[EXPIRY_TIME]', formattedExpiryTime)
            
            // Sent email to admin
            const subject = "Reset Password";
            const htlmTemplate = newUpdatedTemplate;
            
            // send email to logged in user
            const response = await context.functions.execute('fn_email_user_send', subject, htlmTemplate, email)
        
            
            const result = await usersCollection.updateOne({email:email}, {
              $set:{
                verificationCode,
                verificationCodeExpiry
              }
            })
            
                // return { status: 200, message: "EMAIL_SENT" };
            if (response.status === 200) {
              
                return { status: response.status, message: response.message }
            } else if (response.status === 502) {
                return { status: response.status, message: response.message }
            }else if(!response){
              throw Error('USER_NOT_FOUND')
            }

    } catch (error) {
        // Error handling
        const errorLog = await context.functions.execute("ru_error_head");
        await context.functions.execute("ru_error_foot", error, errorLog);
        return { status: 500, message: "UNKNOWN_SYSTEM_ERROR" };
    }
};