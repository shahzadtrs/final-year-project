/*
    This function will be run when the client SDK 'callResetPasswordFunction' is called with an object parameter that
    contains five keys: 'token', 'tokenId', 'username', 'password', and 'currentPasswordValid'.
    'currentPasswordValid' is a boolean will be true if a user changes their password by entering their existing
    password and the password matches the actual password that is stored. Additional parameters are passed in as part
    of the argument list from the SDK.

    The return object must contain a 'status' key which can be empty or one of three string values:
      'success', 'pending', or 'fail'

    'success': the user's password is set to the passed in 'password' parameter.

    'pending': the user's password is not reset and the UserPasswordAuthProviderClient 'resetPassword' function would
      need to be called with the token, tokenId, and new password via an SDK. (see below)

      const Realm = require("realm");
      const appConfig = {
          id: "my-app-id",
          timeout: 1000,
          app: {
              name: "my-app-name",
              version: "1"
          }
        };
      let app = new Realm.App(appConfig);
      let client = app.auth.emailPassword;
      await client.resetPassword(token, tokenId, newPassword);

    'fail': the user's password is not reset and will not be able to log in with that password.

    If an error is thrown within the function the result is the same as 'fail'.

    Example below:

    exports = (
      { token, tokenId, username, password, currentPasswordValid },
      sendEmail,
      securityQuestionAnswer
    ) => {
      // process the reset token, tokenId, username and password
      if (sendEmail) {
        context.functions.execute(
          "sendResetPasswordEmail",
          username,
          token,
          tokenId
        );
        // will wait for SDK resetPassword to be called with the token and tokenId
        return { status: "pending" };
      } else if (
        context.functions.execute(
          "validateSecurityQuestionAnswer",
          username,
          securityQuestionAnswer || currentPasswordValid
        )
      ) {
        // will set the users password to the password parameter
        return { status: "success" };
      }

    The uncommented function below is just a placeholder and will result in failure.
  */
  
  /* ****************************** PASSWORD RESET LOGIC *************************************

  ---- IMPORTANT NOTE ---- We can only send responses back to the client side with the "status" property set to "pending," "success," or "fail."

  1. Password reset can occur in two scenarios:
     - On the Sign-In page where a user clicks on "forgot password."
     - On the Accounts page where a user updates their password by providing the current password.

  This single function, `fn_auth_resetPassFunc`, handles both cases, determined by parameters passed from the client-side function `callResetPasswordFunction`.

  **Question:** How do we differentiate between the two cases when sending emails to users?
  **Answer:** Differentiate by passing parameters: `sendEmail = true` only for the 1st case, and `sendEmail = false` and `currentPasswordUpdate = true` for the second case.

  *********************************** 1st case: Forgot Password ***********************************

  - Call on the client side:
    ```javascript
    app.emailPasswordAuth.callResetPasswordFunction({
        email,
        password: '************', // Auto-generated password. We are not setting password here, so it will be auto-generated because we must need to pass user email and password in this function arguments
    }, true);
    ```

  - Function execution:
    ```javascript
    exports = async ({ token, tokenId, username, password, currentPasswordValid }, sendEmail, currentPasswordUpdate) => {
        if (sendEmail) {
            const emailResponse = await context.functions.execute("fn_email_reset_password", username);

            if (emailResponse.status === 200) {
                // Verify user identity by sending a 6-digit code to their email
                return { status: 'pending' };
            } else {
                console.log("Email sending failed...");
            }
        } else {
            // Reset the password when the 6-digit code is successfully verified
            // Return status 'success' to update the user password
            return { status: 'success' };
        }
    };
    ```

  ****************************** 2nd case: Update Password ************************************

  - Call on the client side:
    ```javascript
    app.emailPasswordAuth.callResetPasswordFunction({
        email,
        password, // User's current password
        currentPassword: password, // User's current password
    }, false, true);
    ```

  - Function execution:
    ```javascript
    else if (currentPasswordUpdate) {
        if (currentPasswordValid) {
            // Send a 6-digit code to the user's email for verification
            const emailResponse = await context.functions.execute("fn_email_reset_password", username);

            if (emailResponse.status === 200) {
                return { status: 'pending' };
            } else {
                console.log("Email sending failed...");
            }
        } else {
            try {
                // Throw an error to indicate that the current password is incorrect
                // This function actual throws an error and that's how we can decide that user has not provided correct currentPasswordValid
                context.functions.execute("sendResetPasswordEmail", username, token, tokenId);
            } catch (error) {
                return { status: "pending" };
            }
        }
    }
    ```

  *************************************************************************************** */



exports = async ({ token, tokenId, username, password, currentPasswordValid }, sendEmail,
    currentPasswordUpdate) => {
    // MongoDB connection variables
    const { MONGO_DB_HOST, MONGO_DB_NAME, MONGO_DB_COLLECTION_USERS } = await context.functions.execute('ru_mongo_db_info');
    const mongodb = context.services.get(MONGO_DB_HOST);
    const usersCollection = mongodb.db(MONGO_DB_NAME).collection(MONGO_DB_COLLECTION_USERS);
   
    if (sendEmail) {
       // Only for Forgot Password
        const emailResponse = await context.functions.execute(
            "fn_email_reset_password", username
        );
        // will wait for SDK resetPassword to be called with the token and tokenId
        if (emailResponse.status === 200) {
            return { status: 'pending' }
        }

    } else if (currentPasswordUpdate) {
        // Only for Update Password
        if (currentPasswordValid) {
            const emailResponse = await context.functions.execute(
                "fn_email_reset_password", username
            );
            // will wait for SDK resetPassword to be called with the token and tokenId
            if (emailResponse.status === 200) {
                return { status: 'pending' }
            } 
        } else if (!currentPasswordValid) {
            context.functions.execute(
                "sendResetPasswordEmail",
                username,
                token,
                tokenId
            );
            return { status: "pending" }

        }
    } else {
        // For both Forgot Password and Update Password
        const currentUser = await usersCollection.findOne({ email: username });
        if (currentUser.resetPasswordIsValid) {
            await usersCollection.updateOne({ email: username }, {
                $unset: {
                    resetPasswordIsValid: '',
                    resetPasswordIsValidExpiry: ''
                }
            })
            return { status: 'success' };
        } else {
            return { status: 'pending' }
        }

    }
    // will not reset the password
    // return { status: 'fail' };
};
