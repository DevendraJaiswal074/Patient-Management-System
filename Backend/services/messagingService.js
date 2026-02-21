const twilio = require("twilio");

// Initialize Twilio client
const initializeTwilio = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    return null;
  }

  return twilio(accountSid, authToken);
};

// Format phone number to international format
const formatPhoneNumber = (phone) => {
  if (phone.startsWith("+")) return phone;
  return `+91${phone}`; // Default to India country code
};

// Generate message content
const generateMessageContent = (name, type) => {
  const date = new Date().toLocaleDateString("en-IN");
  const time = new Date().toLocaleTimeString("en-IN");
  
  return `🏥 Appointment Confirmed!

Hello ${name},

Your appointment has been successfully booked.

📋 Type: ${type === "emergency" ? "🚨 Emergency" : "Regular"}
📅 Date: ${date}
⏰ Time: ${time}
✅ Status: Checked In

Please arrive 10 minutes early.

Thank you for choosing our hospital!`;
};

// Send SMS confirmation
const sendSMS = async (client, phone, name, type) => {
  const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
  
  if (!phoneNumber) {
    return { success: false, skipped: true };
  }

  try {
    const message = await client.messages.create({
      body: generateMessageContent(name, type),
      from: phoneNumber,
      to: formatPhoneNumber(phone),
    });

    return { success: true, messageId: message.sid, channel: "SMS" };
  } catch (error) {
    return { success: false, error: error.message, channel: "SMS" };
  }
};

// Send WhatsApp confirmation
const sendWhatsApp = async (client, phone, name, type) => {
  const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
  
  if (!whatsappNumber) {
    return { success: false, skipped: true };
  }

  try {
    const message = await client.messages.create({
      body: generateMessageContent(name, type),
      from: `whatsapp:${whatsappNumber}`,
      to: `whatsapp:${formatPhoneNumber(phone)}`,
    });

    return { success: true, messageId: message.sid, channel: "WhatsApp" };
  } catch (error) {
    return { success: false, error: error.message, channel: "WhatsApp" };
  }
};

// Main function to send appointment confirmation
const sendAppointmentConfirmation = async (phone, name, type) => {
  const client = initializeTwilio();

  if (!client) {
    console.log("ℹ️  Twilio not configured - skipping notifications");
    return { success: false, configured: false };
  }

  console.log(`📤 Sending confirmation to ${name} (${phone})`);

  const [smsResult, whatsAppResult] = await Promise.allSettled([
    sendSMS(client, phone, name, type),
    sendWhatsApp(client, phone, name, type),
  ]);

  const sms = smsResult.status === "fulfilled" ? smsResult.value : { success: false };
  const whatsapp = whatsAppResult.status === "fulfilled" ? whatsAppResult.value : { success: false };

  if (sms.success) console.log(`✅ SMS sent to ${name}`);
  if (whatsapp.success) console.log(`✅ WhatsApp sent to ${name}`);

  return {
    success: sms.success || whatsapp.success,
    sms,
    whatsapp,
  };
};

module.exports = { sendAppointmentConfirmation };
