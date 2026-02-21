# 🏥 Patient Management System

A web-based **Patient Management System** designed for local hospitals and clinics to efficiently manage patient appointments, daily records, and doctor workflows.

This project helps hospital staff and doctors organize appointments, maintain patient history, and communicate appointment details with patients easily.

---

## � Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Workflow & Features](#-workflow--features)
- [User Roles](#-user-roles)
- [Screenshots](#-screenshots)
- [Team Collaboration](#-team-collaboration)
- [Use Case](#-use-case)
- [Project Status](#-project-status)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

- 🔐 **Role-Based Authentication**
  - Separate login for **Staff**, **Doctors**, and **Admin**
  - Secure access based on user roles
  - Protected dashboards for each role

- 📋 **Patient Appointment Management**
  - Create and manage daily patient appointment lists
  - Add patient details (Name, Age, Phone, Type)
  - Mark patients as Normal or Emergency

- 👥 **Real-time Patient Tracking**
  - View all checked-in patients
  - Track checked-out patients with timestamps
  - Check-out patient with one click
  - Quick status: CheckedIn vs CheckedOut

- 📆 **Date-wise Records**
  - Automatically timestamp all patient entries
  - Access patient records by date
  - View today's patient list

- 📥 **Download Patient Reports**
  - Download day-wise patient lists in Excel format
  - Export all patients or filtered by status
  - Generate reports for checked-in and checked-out patients
  - Supports `.xlsx` file format
  

- 📱 **Responsive UI**
  - Works smoothly on **desktop and mobile devices**
  - Clean and intuitive user interface
  - Color-coded emergency vs normal patients

- 🎨 **Admin Dashboard**
  - Comprehensive admin panel with 4 views
  - All Patients view
  - Checked-In patients only
  - Checked-Out patients only
  - Today's patients report

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.2.0
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4.1
- **Routing:** React Router DOM 7.13
- **Export:** XLSX 0.18.5 (Excel export)
- **Linting:** ESLint 9.39

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5.2
- **Database:** MongoDB with Mongoose 9.1.5
- **Middleware:** CORS, dotenv
- **Dev Tool:** Nodemon 3.1.11

### Version Control
- **Git & GitHub** for collaboration
- Feature-based development workflow
- Code reviews and collaboration

---

## 📁 Project Structure

```
Patient-Management-System/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddPatient.jsx          # Form to add new patient
│   │   │   ├── PatientList.jsx         # Display checked-in patients
│   │   │   ├── AllPatientList.jsx      # Display all patients
│   │   │   ├── CheckedOutList.jsx      # Display checked-out patients
│   │   │   ├── TodayPatient.jsx        # Today's patients view
│   │   │   └── Navbar.jsx              # Navigation bar
│   │   ├── Pages/
│   │   │   ├── LoginOption.jsx         # Login page (Staff/Doctor/Admin)
│   │   │   ├── Signup.jsx              # Signup page
│   │   │   ├── StaffLogin.jsx          # Staff login
│   │   │   ├── DoctorLogin.jsx         # Doctor login
│   │   │   ├── AdminLogin.jsx          # Admin login
│   │   │   ├── StaffPanel.jsx          # Staff dashboard
│   │   │   ├── DoctorPanel.jsx         # Doctor dashboard
│   │   │   ├── AdminPanel.jsx          # Admin dashboard
│   │   │   ├── AdminAllPatients.jsx    # All patients view
│   │   │   ├── AdminCheckedIn.jsx      # Checked-in patients
│   │   │   ├── AdminCheckedOut.jsx     # Checked-out patients
│   │   │   └── AdminTodayPatients.jsx  # Today's patients
│   │   ├── context/
│   │   │   └── PatientContext.jsx      # Global patient context
│   │   ├── assets/                     # Images and assets
│   │   ├── App.jsx                     # Main App component
│   │   ├── main.jsx                    # Entry point
│   │   ├── App.css                     # Styling
│   │   └── index.css                   # Global styles
│   ├── vite.config.js                  # Vite configuration
│   ├── eslint.config.js                # ESLint configuration
│   ├── package.json                    # Frontend dependencies
│   └── index.html
│
├── Backend/
│   ├── config/
│   │   └── connectDB.js                # MongoDB connection
│   ├── models/
│   │   └── Patient.js                  # Patient schema
│   ├── Controllers/
│   │   └── patientController.js        # Business logic
│   ├── Routes/
│   │   └── patientRoutes.js            # API routes
│   ├── services/
│   │   └── fileService.js              # File operations
│   ├── data/
│   │   ├── patients.json               # Patient data reference
│   │   ├── checkedInPatients.json      # CheckedIn reference
│   │   └── checkedOutPatients.json     # CheckedOut reference
│   ├── index.js                        # Server entry point
│   ├── package.json                    # Backend dependencies
│   └── .env                            # Environment variables
│
├── README.md                           # Documentation
├── LICENSE                             # License file
└── .gitignore                          # Git ignore rules
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/DevendraJaiswal074/Patient-Management-System.git
cd Patient-Management-System
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd Backend

# Install dependencies
npm install

# Create .env file
touch .env

# Add environment variables to .env:
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/patient-management
VITE_BACKEND_URL=http://localhost:5000
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend (from root directory)
cd Frontend

# Install dependencies
npm install

# Create .env.local file
touch .env.local

# Add environment variables to .env.local:
VITE_BACKEND_URL=http://localhost:5000
```

### Step 4: MongoDB Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
# Windows:
mongod

# macOS:
brew start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Add to `.env` file

---

## 🚀 Running the Application

### Method 1: Run Both Servers Simultaneously

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
# Application runs on http://localhost:5173
```

### Method 2: Production Build

**Backend:**
```bash
cd Backend
npm start
```

**Frontend:**
```bash
cd Frontend
npm run build
npm run preview
```

### Application URLs
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Base:** http://localhost:5000/api

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Checked-In Patients
```
GET /api/patients
```
**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "age": 35,
    "phone": "9876543210",
    "type": "normal",
    "status": "CheckedIn",
    "checkedOutAt": null,
    "createdAt": "2025-02-21T10:30:00Z",
    "updatedAt": "2025-02-21T10:30:00Z"
  }
]
```

#### 2. Add New Patient
```
POST /api/patients
Content-Type: application/json

{
  "name": "Jane Smith",
  "age": 28,
  "phone": "9876543201",
  "type": "emergency"
}
```
**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Jane Smith",
  "age": 28,
  "phone": "9876543201",
  "type": "emergency",
  "status": "CheckedIn",
  "createdAt": "2025-02-21T11:00:00Z",
  "updatedAt": "2025-02-21T11:00:00Z"
}
```

**Validation:**
- All fields (name, age, phone, type) required
- Age: must be between 1-109
- Phone: must be exactly 10 digits
- Type: "normal" or "emergency"

#### 3. Check-Out Patient
```
PATCH /api/patients/:id/checkout
```
**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "age": 35,
  "phone": "9876543210",
  "type": "normal",
  "status": "CheckedOut",
  "checkedOutAt": "2025-02-21T15:45:00Z",
  "createdAt": "2025-02-21T10:30:00Z",
  "updatedAt": "2025-02-21T15:45:00Z"
}
```

#### 4. Get All Checked-Out Patients
```
GET /api/checked-out
```
**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "age": 35,
    "phone": "9876543210",
    "type": "normal",
    "status": "CheckedOut",
    "checkedOutAt": "2025-02-21T15:45:00Z",
    "createdAt": "2025-02-21T10:30:00Z",
    "updatedAt": "2025-02-21T15:45:00Z"
  }
]
```

---

## 💾 Database Schema

### Patient Model
```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    description: "Patient's full name"
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 109,
    description: "Patient's age in years"
  },
  phone: {
    type: String,
    required: true,
    validate: [length === 10],
    description: "Patient's 10-digit phone number"
  },
  type: {
    type: String,
    enum: ["normal", "emergency"],
    required: true,
    description: "Patient type: normal appointment or emergency"
  },
  status: {
    type: String,
    enum: ["CheckedIn", "CheckedOut"],
    default: "CheckedIn",
    description: "Current status of patient"
  },
  checkedOutAt: {
    type: Date,
    default: null,
    description: "Timestamp when patient checked out"
  },
  createdAt: {
    type: Date,
    description: "Patient check-in timestamp"
  },
  updatedAt: {
    type: Date,
    description: "Last update timestamp"
  }
}
```

---

## 🎯 Workflow & Features

### Staff Workflow

1. **Login to Staff Dashboard**
   - Staff logs in via staff-login page
   - Redirected to `/staff-dashboard`

2. **Add New Patient**
   - Fill form with patient details
   - Select type: Normal or Emergency
   - Submit to add patient
   - Patient added with status: CheckedIn

3. **View Today's Patients**
   - See all checked-in patients in table format
   - Info displayed: Name, Age, Phone, Type
   - Emergency patients shown with red indicator

4. **Check-Out Patient**
   - Click "Check Out" button on patient row
   - Patient status changes to CheckedOut
   - Timestamp recorded
   - Patient removed from CheckedIn list

5. **View Checked-Out Patients**
   - See list of patients who have checked out
   - View their check-out timestamps

### Admin Workflow

1. **Login to Admin Dashboard**
   - Admin logs in via admin-login page
   - Redirected to `/admin-dashboard`

2. **View All Patients**
   - Access `/admin-dashboard/all-patients`
   - See combined CheckedIn + CheckedOut patients
   - Export to Excel report

3. **Filter by Status**
   - `/admin-dashboard/checked-in` - Only CheckedIn
   - `/admin-dashboard/checked-out` - Only CheckedOut

4. **Today's Patients**
   - `/admin-dashboard/today-patients`
   - View patients added today with their status

5. **Generate Reports**
   - Download Excel reports
   - Export all patients, checked-in only, or checked-out only
   - File format: `.xlsx` (Excel)

### Doctor Workflow

1. **Login to Doctor Dashboard**
   - Doctor logs in via doctor-login page
   - Redirected to `/doctor-dashboard`

2. **View Patient List**
   - See today's patient appointments
   - Review patient information
   - Prepare for consultations

---

## 👥 User Roles

### 1. **Staff**
- **Access:** `/staff-dashboard`
- **Permissions:**
  - Add new patients
  - View today's checked-in patients
  - Check-out patients
  - See checked-out patients

### 2. **Doctor**
- **Access:** `/doctor-dashboard`
- **Permissions:**
  - View today's patient appointments
  - Access patient details
  - Review appointment lists

### 3. **Admin**
- **Access:** `/admin-dashboard`
- **Permissions:**
  - View all patients (checked-in and checked-out)
  - Filter patients by status
  - View today's patients
  - Generate and download Excel reports
  - Access comprehensive analytics

---

## 📷 Screenshots

![Login Page](https://github.com/user-attachments/assets/31536695-cbff-45a5-9c6d-1927112b3665)
![Staff Dashboard](https://github.com/user-attachments/assets/e6bfa4ce-86ff-47a5-b584-87b8e80314e2)
![Patient List](https://github.com/user-attachments/assets/696e4166-19c5-4f40-af0c-a2b513c08b24)
![Admin Panel](https://github.com/user-attachments/assets/d5d631cf-de4a-4b2b-9d1e-72827b032b09)

---

## 🤝 Team Collaboration

- Developed collaboratively with a team
- Used **GitHub** for:
  - Version control
  - Feature-based development workflow
  - Code reviews and collaboration

### Team Members
- [Chandanchaudhary](https://github.com/iamchandanchaudhary)
- [DeepanshuYadav](https://github.com/deepanshu-yadav3245)
- [DevendraJaiswal](https://github.com/DevendraJaiswal074)

---

## 🎯 Use Case

This system is built for:
- **Local hospitals**
- **Clinics**
- **Small healthcare centers**
- **Diagnostic centers**
- **Health wellness centers**

To simplify:
- Patient appointment handling
- Daily patient tracking
- Doctor and staff coordination
- Efficient patient flow management
- Quick report generation

### Benefits

✅ Streamlined patient check-in/check-out process
✅ Real-time patient status tracking
✅ Automated record-keeping with timestamps
✅ Quick Excel report generation
✅ Role-based access control
✅ Mobile-friendly interface
✅ Scalable MongoDB backend

---

## 📌 Project Status

🟢 **Currently in Development**
New features and improvements are being actively added.

**Latest Updates:**
- Patient management CRUD operations
- Check-in/Check-out functionality
- Excel export for reports
- Role-based dashboards
- Responsive UI implementation

---

## 🔮 Future Enhancements

- 📧 **Email Notifications** - Send appointment reminders to patients
- 📲 **WhatsApp Integration** - Share appointment details via WhatsApp
- 🔒 **Advanced Authentication** - JWT tokens, password hashing
- 📊 **Analytics Dashboard** - Patient statistics and insights
- 🗓️ **Appointment Scheduling** - Book future appointments
- 🏥 **Multiple Branches** - Support for hospital chain management
- 💬 **Patient Communication** - In-app messaging system
- 📝 **Medical History** - Maintain patient medical records
- 🔐 **Session Management** - User session timeout and security
- 🎯 **OTP Verification** - Phone number verification system
- 📱 **Mobile App** - React Native mobile application
- 🔍 **Advanced Filtering** - Filter patients by multiple criteria
- 🌙 **Dark Mode** - Theme switching capability
- 🔔 **Real-time Updates** - WebSocket for live notifications

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic
- Test before submitting PR
- Follow project folder structure

---

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

For questions or support, please:
- Open an issue on GitHub
- Contact team members directly
- Check existing documentation

---

## 🙏 Acknowledgments

- Built with React.js and Node.js
- Database powered by MongoDB
- Styled with Tailwind CSS
- Inspired by real-world healthcare management needs

---

**Made with ❤️ by the Patient Management System Team**
