# SMS/WhatsApp Notification Setup

This guide explains how to configure SMS and WhatsApp notifications for patient appointment confirmations.

## Features
- Automatic SMS notification when staff adds a patient
- WhatsApp message confirmation
- Non-blocking implementation (doesn't affect patient registration)
- Optional feature (works without configuration)

## Quick Setup

### 1. Create Twilio Account
- Visit: https://www.twilio.com/try-twilio
- Sign up for free trial ($15 credit included)
- Verify your email and phone number

### 2. Get Credentials
- Login to https://console.twilio.com
- Copy your **Account SID** and **Auth Token**

### 3. Get Phone Number
- Go to Phone Numbers → Buy a number
- Select country and SMS capability
- Buy a number (free with trial credits)

### 4. Configure WhatsApp (Optional)
- Go to Messaging → Try WhatsApp
- Get sandbox number
- Send join code from your WhatsApp

### 5. Update .env File
```env
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=+1234567890
```

### 6. Restart Server
```bash
npm run dev
```

## Testing
1. Add a patient through Staff Panel
2. Check terminal for success message
3. Patient receives SMS/WhatsApp confirmation

## Message Format
```
🏥 Appointment Confirmed!

Hello [Patient Name],

Your appointment has been successfully booked.

📋 Type: Regular / 🚨 Emergency
📅 Date: [Today's Date]
⏰ Time: [Current Time]
✅ Status: Checked In

Please arrive 10 minutes early.

Thank you for choosing our hospital!
```

## Notes
- Feature is **optional** - works without Twilio configuration
- Patient registration always succeeds regardless of message status
- Free trial: SMS to verified numbers only
- Upgrade account to send to any number

## Troubleshooting
- **No messages sent**: Check if Twilio credentials are in .env
- **Authentication failed**: Verify Account SID and Auth Token
- **Invalid number**: Use international format (+91xxxxxxxxxx)
- **WhatsApp failed**: Ensure sandbox is joined

For detailed documentation: https://www.twilio.com/docs
