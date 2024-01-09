exports = async function (type) {
    console.log("fn_email_templates_get", type)
    try {
         if (type === "reset_password_template") {
            return reset_password_template
        }
    } catch (error) {
        console.log(error)
    }
};

const reset_password_template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify Your Email</title>
  <style>
    /* Global styles */
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      line-height: 1.6;
      background-color: #f7f7f7;
    }

    /* Container styles */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #e1e1e1;
      border-radius: 5px;
    }

    /* Header styles */
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #007bff;
      margin: 0;
    }

    /* Content styles */
    .content {
      text-align: center;
      margin-bottom: 30px;
    }
    .content p {
      margin: 0;
    }

    /* Button styles */
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #0056b3;
    }

    /* Footer styles */
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Thank you for registering with our service. To complete the reset password process, please use the following verification code:</p>
      <p style="font-size: 24px; font-weight: bold;">[VERIFICATION_CODE]</p>
      <p>Please enter this verification code on our website to verify your identity.</p>
       <p>The verification code will expire at: [EXPIRY_TIME]</p>
    </div>
    <div class="footer">
      <p>Best regards,</p>
      <p>TruYu Data-Wallet</p>
    </div>
  </div>
</body>
</html>


`;
