exports = async function(provider, mailOptions){
  const transporter = await context.functions.execute('fn_email_transport_create', provider);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};