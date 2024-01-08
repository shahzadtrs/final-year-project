// Function for handling verification of a user by matching a verification code
exports = async function ({ query, headers, body }, response) {
  
    try {
        // Create a custom user data document for the user
        const mdb = context.services.get("mongodb-atlas");
        const usersCollection = mdb.db("FYP-Backend").collection("users");

        // Parse payload to extract email and verification code -- email to send email to the actual user because this one is not signed in user
        const { email, verificationCode } = JSON.parse(
            body.text()
        );

        // Find the user in the database using the provided email
        const currentUser = await usersCollection.findOne({ email: email });

        if (currentUser) {
            // Get the current date and time
            // Get the expiration date and time of the verification code
            // Set the expiry time for resetPasswordIsValid (e.g., 5 minutes from now)
            // Check if the verification code matches and has not expired
            // Update the user document to unset the user properties and set the user properties
            
            const currentDateTime = new Date();
            const codeExpiryDateTime = new Date(currentUser.verificationCodeExpiry);

            // Set the resetPasswordIsValid expiry (e.g., 5 minutes from now)
            const resetPasswordIsValidExpiry = new Date();
            resetPasswordIsValidExpiry.setMinutes(resetPasswordIsValidExpiry.getMinutes() + 5); // Expiry time in 5 minutes
            
            if (currentUser.verificationCode === verificationCode && currentDateTime < codeExpiryDateTime) {
            
                await usersCollection.updateOne({ email: email }, {
                    $unset: {
                        verificationCode: "",
                        verificationCodeExpiry: ""
                    },
                    $set:{
                      resetPasswordIsValid:true,
                      resetPasswordIsValidExpiry
                    }
                    
                });

                response.setBody({status:200,  message: "SUCCESSFULLY_VERIFIED" });
            } else {
                response.setBody({status: 400, message: "BAD_REQUEST" });
            }
        }
    } catch (error) {
        // Error handling
        const errorLog = await context.functions.execute("ru_error_head");
        await context.functions.execute("ru_error_foot", error, errorLog);
        return { status: 500, message: "UNKNOWN_SYSTEM_ERROR" };
    }
};
