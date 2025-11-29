# QR-Based Attendance System

This repository contains a functional prototype of a **QR Code Based Attendance System** designed to simplify and automate student/employee attendance marking.  
The system uses **QR code scanning** for secure, fast, and contactless attendance tracking.

---

## 🚀 Project Overview

- Users (students/teachers) can **log in or register**
- Students scan a **unique QR code** to mark attendance
- Camera-based live scanner implemented on frontend
- Simple UI built using **HTML, CSS, JavaScript**
- Basic workflow: Login → Dashboard → QR Scan → Attendance Confirmed
- Can be extended into a fully integrated system with backend, database, and authentication

---

## 🎯 Key Features

- ✔ **Fast QR Scan** using device camera  
- ✔ **User Login & Register Pages**  
- ✔ **Separate dashboard for Student & Teacher**  
- ✔ **Clean UI with responsive layout**  
- ✔ **Attendance confirmation message**  
- ✔ Ready for backend integration (Node.js / Firebase / PHP)

---

## 📂 Folder Structure

```
qr-attendance-system/
│
├── index.html           # Login page
├── register.html        # Registration page
├── dashboard.html       # User dashboard
├── scan.html            # QR scanner page
│
├── /css                 # Styling files
├── /js                  # QR scan + UI logic
└── /assets              # Images/QR icons
```

---

## 🛠️ Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript**
- **QR Scanner Library (html5-qrcode)**

*(You may replace this if using another scanner library.)*

---

## 📌 Workflow (How It Works)

1. User opens the app  
2. Login / Register  
3. Select **Student** or **Teacher** (if implemented)  
4. User dashboard opens  
5. Student clicks **Scan QR**  
6. Device camera opens  
7. QR scanned → attendance recorded  
8. Success message shown  

---

## 🌟 Future Enhancements (Planned)

- Database integration (MySQL / Firebase / MongoDB)  
- Verify location (Geo-fencing)  
- Teacher can view class-wise attendance  
- Admin panel  
- Unique dynamic QR for each class  
- Security checks for duplicate / invalid scans  

## 📚 Learning Goals

This project helped me learn:

- How QR scanning works inside the browser  
- How to integrate a scanner library using JS  
- UI/UX flow for authentication-based systems  
- Frontend structuring for real-world applications  

---

## 🧑‍💻 How to Run

1. Clone the repo  
   ```
   git clone https://github.com/your-username/qr-attendance-system.git
   ```
2. Open in VS Code  
3. Run using Live Server  
4. Open **scan.html** to test QR scanning  

---

## 📩 Contact / Feedback

Feel free to reach out for suggestions or collaboration!

---

⭐ If this project helps you, don’t forget to star the repository!
