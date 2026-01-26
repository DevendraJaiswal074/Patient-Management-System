# 🏥 Patient Management System

A web-based **Patient Management System** designed to help **doctors and compounders** efficiently manage daily patient appointments, view patient lists, and calculate daily earnings. The system also automatically sends appointment notifications to patients via their phone numbers.

---

## 📌 Project Overview

The **Patient Management System** is built to simplify the process of handling patient appointments in clinics or hospitals. It allows medical staff to easily view patient details, track the total number of patients per day, calculate daily earnings, and automatically notify patients about their appointment schedule.

Patients receive an SMS notification like:

> *"You booked an appointment with Dr. XYZ. Your checking number will come at 1 PM on Date: XX/XX/XXXX. Thanks for your appointment."*

---

## 🎯 Key Features

- 📋 **Patient Listing**
  - Easy-to-view patient list for doctors and compounders
  - Displays patient details such as name, phone number, and appointment number

- 🔢 **Daily Patient Limit**
  - Maximum of **70 patients per day**
  - Automatically schedules patients for the **next day** once the daily limit is reached

- 💰 **Daily Earnings Calculation**
  - Automatically calculates the total number of patients
  - Displays total earnings for the day

- 📱 **Automatic SMS Notifications**
  - Sends appointment confirmation messages to patients
  - Includes doctor name, appointment time, and date

- 🧾 **Patient Details Management**
  - Add and store patient information
  - Auto-generate appointment numbers

- ⏭ **Next-Day Appointment Automation**
  - Automatically assigns appointments to the next available day when the current day is full

---

## 🛠️ Technologies Used

- **Frontend:** React.js  
- **Styling:** Tailwind CSS  
- **Database:** (Specify database here – e.g., MongoDB / MySQL / Firebase)  
- **Other Tools:**  
  - SMS API (for sending appointment notifications)
  - REST APIs for data handling

---

## ⚙️ Functionalities Summary

- Add and manage patient records
- Auto-send appointment SMS to patients
- Display patient list for doctors and compounders
- Calculate total patients and daily income
- Automatically manage daily and next-day appointments

---

## 🚀 Future Enhancements (Optional)

- Doctor-wise appointment management
- Admin dashboard with analytics
- Appointment cancellation and rescheduling
- Patient history tracking
- Role-based authentication (Doctor / Compounder / Admin)

---

## 📂 Project Setup (Optional)

```bash
# Install dependencies
npm install

# Run the development server
npm start
