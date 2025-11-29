// // ==================== REGISTRATION SYSTEM ====================
// // (Registration logic is in register.html file itself)

// // ✅ FIX: Navigation to registration page
// function navigateToRegister(event) {
//     if (event) event.preventDefault();
    
//     // Get current path and construct registration path
//     const currentPath = window.location.pathname;
//     const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    
//     // Try multiple possible paths
//     const possiblePaths = [
//         'register.html',
//         './register.html',
//         currentDir + 'register.html',
//         '../register.html'
//     ];
    
//     // Use the first path (register.html in same directory)
//     window.location.href = 'register.html';
//     return false;
// }

// // ==================== LOGIN SYSTEM ====================

// let currentRole = '';

// function showLogin(role) {
//     currentRole = role;
//     document.querySelector('.role-buttons').classList.add('hidden');
//     document.getElementById('loginForm').classList.remove('hidden');
//     document.getElementById('loginTitle').textContent = role.charAt(0).toUpperCase() + role.slice(1) + ' Login';
//     document.getElementById('errorMsg').textContent = '';
// }

// function hideLogin() {
//     document.querySelector('.role-buttons').classList.remove('hidden');
//     document.getElementById('loginForm').classList.add('hidden');
//     document.getElementById('systemId').value = '';
//     document.getElementById('password').value = '';
//     document.getElementById('errorMsg').textContent = '';
// }

// function login() {
//     const systemId = document.getElementById('systemId').value.trim().toUpperCase();
//     const password = document.getElementById('password').value;
//     const errorMsg = document.getElementById('errorMsg');

//     if (!systemId || !password) {
//         errorMsg.textContent = 'Please enter System ID and Password!';
//         return;
//     }

//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const user = users.find(u => u.id === systemId && u.password === password && u.role === currentRole);

//     if (user) {
//         localStorage.setItem('loggedInUser', JSON.stringify(user));
//         localStorage.setItem('userRole', user.role);
        
//         if (user.role === 'teacher') {
//             window.location.href = 'teacher.html';
//         } else if (user.role === 'student') {
//             window.location.href = 'student.html';
//         }
//     } else {
//         errorMsg.textContent = 'Invalid System ID or Password!';
//     }
// }

// function logout() {
//     localStorage.removeItem('loggedInUser');
//     localStorage.removeItem('userRole');
//     window.location.href = 'index.html';
// }

// // ==================== TEACHER DASHBOARD ====================

// function loadTeacherProfile() {
//     const user = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (!user || user.role !== 'teacher') {
//         window.location.href = 'index.html';
//         return;
//     }

//     document.getElementById('teacherPhoto').src = user.photo;
//     document.getElementById('teacherName').textContent = user.name;
//     document.getElementById('teacherSystemId').textContent = user.id;
//     document.getElementById('teacherDept').textContent = user.dept;
    
//     loadSessionHistory();
// }

// function generateQR() {
//     const sessionId = 'SESSION-' + Date.now();
//     const timestamp = new Date().toISOString();
    
//     const qrData = JSON.stringify({
//         sessionId: sessionId,
//         timestamp: timestamp
//     });

//     // Store current session
//     localStorage.setItem('currentSession', qrData);
    
//     // Save to sessions history
//     const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
//     sessions.push({
//         id: sessionId,
//         date: new Date().toLocaleString()
//     });
//     localStorage.setItem('sessions', JSON.stringify(sessions));

//     // Display QR Code
//     const qrDisplay = document.getElementById('qrDisplay');
//     qrDisplay.classList.remove('hidden');

//     // Generate QR using QRious library
//     const qr = new QRious({
//         element: document.getElementById('qrImage'),
//         value: qrData,
//         size: 300,
//         level: 'H'
//     });

//     // Display QR info
//     document.getElementById('qrId').textContent = sessionId;
//     document.getElementById('qrTime').textContent = new Date(timestamp).toLocaleString();
    
//     // Show QR data text for manual entry
//     const qrDataText = document.getElementById('qrDataText');
//     if (qrDataText) {
//         qrDataText.value = qrData;
//     }
    
//     console.log('QR Generated:', qrData);
//     alert('QR Code Generated Successfully! Students can now scan it.');
    
//     loadSessionHistory();
// }

// // ✅ NEW FEATURE: Download QR Code as PNG
// function downloadQR() {
//     const qrImage = document.getElementById('qrImage');
//     const sessionId = document.getElementById('qrId').textContent;
    
//     if (!qrImage || !qrImage.src) {
//         alert('Please generate a QR code first!');
//         return;
//     }
    
//     // Create download link
//     const link = document.createElement('a');
//     link.download = `QR_${sessionId}.png`;
//     link.href = qrImage.src;
//     link.click();
    
//     console.log('QR Code downloaded');
// }

// // ✅ NEW FEATURE: Share QR Code
// async function shareQR() {
//     const qrImage = document.getElementById('qrImage');
//     const sessionId = document.getElementById('qrId').textContent;
//     const qrData = document.getElementById('qrDataText').value;
    
//     if (!qrImage || !qrImage.src) {
//         alert('Please generate a QR code first!');
//         return;
//     }
    
//     // Check if Web Share API is available
//     if (navigator.share) {
//         try {
//             // Convert base64 to blob
//             const response = await fetch(qrImage.src);
//             const blob = await response.blob();
//             const file = new File([blob], `QR_${sessionId}.png`, { type: 'image/png' });
            
//             await navigator.share({
//                 title: 'Attendance QR Code',
//                 text: `Session ID: ${sessionId}\n\nQR Data: ${qrData}`,
//                 files: [file]
//             });
            
//             console.log('QR Code shared successfully');
//         } catch (error) {
//             console.log('Share failed, falling back to copy:', error);
//             fallbackShareQR(qrData);
//         }
//     } else {
//         // Fallback: Copy QR data to clipboard
//         fallbackShareQR(qrData);
//     }
// }

// function fallbackShareQR(qrData) {
//     // Copy to clipboard
//     const textarea = document.createElement('textarea');
//     textarea.value = qrData;
//     document.body.appendChild(textarea);
//     textarea.select();
//     document.execCommand('copy');
//     document.body.removeChild(textarea);
    
//     alert('QR Code data copied to clipboard! You can now share it via any messaging app.');
// }

// function loadSessionHistory() {
//     const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
//     const sessionList = document.getElementById('sessionList');
    
//     if (sessions.length === 0) {
//         sessionList.innerHTML = '<li style="color: #999; font-style: italic;">No sessions yet</li>';
//         return;
//     }
    
//     sessionList.innerHTML = sessions.slice(-5).reverse().map(session => 
//         `<li style="padding: 10px; border-bottom: 1px solid #e0e0e0;">
//             <strong>${session.id}</strong> - ${session.date}
//         </li>`
//     ).join('');
// }

// function copyQRData() {
//     const qrDataText = document.getElementById('qrDataText');
//     qrDataText.select();
//     document.execCommand('copy');
//     alert('QR Data copied to clipboard!');
// }

// // ✅ FIX: Load attendance from shared attendanceRecords array with complete identity
// function loadAttendanceRecords() {
//     const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
//     const tbody = document.getElementById('attendanceBody');

//     if (attendanceRecords.length === 0) {
//         tbody.innerHTML = '<tr><td colspan="5" class="no-data">No attendance records yet</td></tr>';
//         return;
//     }

//     // Sort by timestamp (most recent first)
//     attendanceRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//     // ✅ FIX: Display complete student identity with date AND time
//     tbody.innerHTML = attendanceRecords.map(record => `
//         <tr>
//             <td>${record.name}</td>
//             <td>${record.systemId}</td>
//             <td>${record.date} ${record.time}</td>
//             <td>${record.sessionId}</td>
//             <td class="status-present">${record.status}</td>
//         </tr>
//     `).join('');
// }

// function downloadCSV() {
//     const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    
//     if (attendanceRecords.length === 0) {
//         alert('No attendance records to download!');
//         return;
//     }

//     // ✅ FIX: CSV with complete student identity
//     let csv = 'Student Name,System ID,Date,Time,Session ID,Status\n';
//     attendanceRecords.forEach(record => {
//         csv += `${record.name},${record.systemId},${record.date},${record.time},${record.sessionId},${record.status}\n`;
//     });

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'attendance_' + new Date().toISOString().split('T')[0] + '.csv';
//     a.click();
//     window.URL.revokeObjectURL(url);
// }

// // ==================== STUDENT DASHBOARD ====================

// function loadStudentProfile() {
//     const user = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (!user || user.role !== 'student') {
//         window.location.href = 'index.html';
//         return;
//     }

//     document.getElementById('studentPhoto').src = user.photo;
//     document.getElementById('studentName').textContent = user.name;
//     document.getElementById('studentSystemId').textContent = user.id;
//     document.getElementById('studentDept').textContent = user.dept;
    
//     // ✅ FIX: Count attendance using systemId field
//     const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
//     const myAttendance = attendanceRecords.filter(record => record.systemId === user.id);
//     document.getElementById('totalAttendance').textContent = myAttendance.length;
// }

// // ==================== QR SCANNER ====================

// let videoStream = null;
// let scanInterval = null;
// let isScanning = false;

// function startScanner() {
//     const video = document.getElementById('video');
//     const canvas = document.getElementById('canvas');
//     const scannerContainer = document.getElementById('scannerContainer');
//     const scanResult = document.getElementById('scanResult');
//     const stopBtn = document.getElementById('stopScanBtn');

//     scannerContainer.classList.remove('hidden');
//     stopBtn.classList.remove('hidden');
//     scanResult.classList.add('hidden');
//     isScanning = true;

//     // Check if session exists first
//     const currentSession = localStorage.getItem('currentSession');
//     if (!currentSession) {
//         scanResult.textContent = '⚠️ No active session from teacher. Please ask teacher to generate QR first.';
//         scanResult.className = 'scan-result error';
//         scanResult.classList.remove('hidden');
//         stopScanner();
//         return;
//     }

//     // Request camera
//     const constraints = {
//         video: {
//             facingMode: { ideal: 'environment' },
//             width: { min: 640, ideal: 1280, max: 1920 },
//             height: { min: 480, ideal: 720, max: 1080 }
//         }
//     };

//     navigator.mediaDevices.getUserMedia(constraints)
//     .then(stream => {
//         videoStream = stream;
//         video.srcObject = stream;
        
//         video.onloadedmetadata = () => {
//             video.play();
//             canvas.width = video.videoWidth;
//             canvas.height = video.videoHeight;
            
//             console.log('Camera started:', video.videoWidth, 'x', video.videoHeight);
            
//             setTimeout(() => {
//                 if (isScanning) {
//                     scanInterval = setInterval(scanQRCode, 250);
//                     console.log('Scanning started...');
//                 }
//             }, 1000);
//         };
//     })
//     .catch(err => {
//         console.error('Camera error:', err);
//         scanResult.textContent = '❌ Camera access denied! Please allow camera permissions and try again.';
//         scanResult.className = 'scan-result error';
//         scanResult.classList.remove('hidden');
//         scannerContainer.classList.add('hidden');
//         stopBtn.classList.add('hidden');
//         isScanning = false;
//     });
// }

// function stopScanner() {
//     const video = document.getElementById('video');
//     const scannerContainer = document.getElementById('scannerContainer');
//     const stopBtn = document.getElementById('stopScanBtn');

//     isScanning = false;

//     if (videoStream) {
//         videoStream.getTracks().forEach(track => track.stop());
//         videoStream = null;
//     }

//     if (scanInterval) {
//         clearInterval(scanInterval);
//         scanInterval = null;
//     }

//     video.srcObject = null;
//     scannerContainer.classList.add('hidden');
//     stopBtn.classList.add('hidden');
// }

// function scanQRCode() {
//     if (!isScanning) return;

//     const video = document.getElementById('video');
//     const canvas = document.getElementById('canvas');

//     if (video.readyState === video.HAVE_ENOUGH_DATA) {
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         const code = jsQR(imageData.data, imageData.width, imageData.height, {
//             inversionAttempts: "attemptBoth",
//         });

//         if (code && code.data) {
//             console.log('✅ QR Code detected:', code.data);
//             isScanning = false;
//             stopScanner();
//             processQRCode(code.data);
//         }
//     }
// }

// // Manual QR Input
// function processManualQR() {
//     const manualQR = document.getElementById('manualQR').value.trim();
//     const scanResult = document.getElementById('scanResult');
    
//     if (!manualQR) {
//         scanResult.textContent = '⚠️ Please paste the QR code data!';
//         scanResult.className = 'scan-result error';
//         scanResult.classList.remove('hidden');
//         return;
//     }
    
//     processQRCode(manualQR);
// }

// // ✅ FIX: Upload QR Image - Complete Implementation
// function uploadQRImage() {
//     const fileInput = document.getElementById('qrImageUpload');
//     const scanResult = document.getElementById('scanResult');
    
//     // Validate file selection
//     if (!fileInput.files || !fileInput.files[0]) {
//         scanResult.textContent = '⚠️ Please select an image file!';
//         scanResult.className = 'scan-result error';
//         scanResult.classList.remove('hidden');
//         return;
//     }
    
//     const file = fileInput.files[0];
    
//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//         scanResult.textContent = '⚠️ Please select a valid image file!';
//         scanResult.className = 'scan-result error';
//         scanResult.classList.remove('hidden');
//         return;
//     }
    
//     // Show processing message
//     scanResult.textContent = '🔄 Processing image... Please wait.';
//     scanResult.className = 'scan-result';
//     scanResult.style.background = '#fff3cd';
//     scanResult.style.color = '#856404';
//     scanResult.style.border = '2px solid #ffeaa7';
//     scanResult.classList.remove('hidden');
    
//     const reader = new FileReader();
    
//     reader.onload = function(e) {
//         const img = new Image();
        
//         img.onload = function() {
//             try {
//                 // Create canvas to decode QR from image
//                 const canvas = document.createElement('canvas');
//                 const ctx = canvas.getContext('2d');
                
//                 // Set canvas size to image size
//                 canvas.width = img.width;
//                 canvas.height = img.height;
                
//                 // Draw image on canvas
//                 ctx.drawImage(img, 0, 0, img.width, img.height);
                
//                 // Get image data
//                 const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                
//                 // Decode QR code using jsQR
//                 const code = jsQR(imageData.data, imageData.width, imageData.height, {
//                     inversionAttempts: "attemptBoth",
//                 });
                
//                 if (code && code.data) {
//                     console.log('✅ QR Code successfully extracted from image:', code.data);
                    
//                     // Clear the file input
//                     fileInput.value = '';
                    
//                     // Process the QR code data
//                     processQRCode(code.data);
//                 } else {
//                     console.log('❌ No QR code detected in image');
//                     scanResult.textContent = '❌ No QR code found in the image! Please upload a clear QR code image.';
//                     scanResult.className = 'scan-result error';
//                     scanResult.classList.remove('hidden');
//                 }
//             } catch (error) {
//                 console.error('Error processing image:', error);
//                 scanResult.textContent = '❌ Error processing image! Please try again.';
//                 scanResult.className = 'scan-result error';
//                 scanResult.classList.remove('hidden');
//             }
//         };
        
//         img.onerror = function() {
//             scanResult.textContent = '❌ Failed to load image! Please try another file.';
//             scanResult.className = 'scan-result error';
//             scanResult.classList.remove('hidden');
//         };
        
//         img.src = e.target.result;
//     };
    
//     reader.onerror = function() {
//         scanResult.textContent = '❌ Failed to read file! Please try again.';
//         scanResult.className = 'scan-result error';
//         scanResult.classList.remove('hidden');
//     };
    
//     reader.readAsDataURL(file);
// }

// function processQRCode(qrData) {
//     const scanResult = document.getElementById('scanResult');
//     const currentSession = localStorage.getItem('currentSession');

//     console.log('Processing QR:', qrData);
//     console.log('Stored Session:', currentSession);

//     if (!currentSession) {
//         scanResult.textContent = '❌ No active session from teacher. Please ask teacher to generate QR first.';
//         scanResult.className = 'scan-result error';
//         scanResult.classList.remove('hidden');
//         return;
//     }

//     try {
//         const scannedData = JSON.parse(qrData);
//         const storedData = JSON.parse(currentSession);

//         console.log('Scanned Session ID:', scannedData.sessionId);
//         console.log('Stored Session ID:', storedData.sessionId);

//         if (scannedData.sessionId === storedData.sessionId) {
//             markAttendance(scannedData);
//             scanResult.textContent = '✓ Attendance Marked Successfully!';
//             scanResult.className = 'scan-result success';
//             console.log('Attendance marked successfully!');
//         } else {
//             scanResult.textContent = '❌ Invalid QR Code! Please scan the current QR from teacher.';
//             scanResult.className = 'scan-result error';
//         }
//     } catch (e) {
//         console.error('QR Parse Error:', e);
//         scanResult.textContent = '❌ Invalid QR Code format! Please scan the QR generated by teacher.';
//         scanResult.className = 'scan-result error';
//     }

//     scanResult.classList.remove('hidden');
// }

// // ✅ FIX: Save to shared attendanceRecords array with complete student identity
// function markAttendance(sessionData) {
//     const user = JSON.parse(localStorage.getItem('loggedInUser'));
//     const scanResult = document.getElementById('scanResult');
    
//     // Check if already marked for this session
//     const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
//     const alreadyMarked = attendanceRecords.some(
//         record => record.systemId === user.id && record.sessionId === sessionData.sessionId
//     );
    
//     if (alreadyMarked) {
//         scanResult.textContent = '⚠️ Attendance already marked for this session!';
//         scanResult.className = 'scan-result error';
//         scanResult.classList.remove('hidden');
//         return;
//     }

//     const now = new Date();
    
//     // ✅ FIX: Updated attendance record structure with complete identity
//     const attendanceRecord = {
//         name: user.name,                              // Student full name
//         systemId: user.id,                            // System ID (STU123, etc)
//         sessionId: sessionData.sessionId,             // Session ID
//         date: now.toLocaleDateString(),               // Date
//         time: now.toLocaleTimeString(),               // Time
//         status: 'Present',                            // Status
//         timestamp: now.toISOString()                  // For sorting
//     };

//     // Add to shared attendance records array
//     attendanceRecords.push(attendanceRecord);
//     localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    
//     console.log('✅ Attendance saved successfully:', attendanceRecord);
    
//     // Reload attendance display
//     loadMyAttendance();
    
//     // Update total count
//     const myAttendance = attendanceRecords.filter(record => record.systemId === user.id);
//     document.getElementById('totalAttendance').textContent = myAttendance.length;
// }

// function loadMyAttendance() {
//     const user = JSON.parse(localStorage.getItem('loggedInUser'));
//     const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
//     const tbody = document.getElementById('myAttendanceBody');

//     // Filter records for current student using systemId
//     const myRecords = attendanceRecords.filter(record => record.systemId === user.id);

//     if (myRecords.length === 0) {
//         tbody.innerHTML = '<tr><td colspan="3" class="no-data">No attendance records yet</td></tr>';
//         return;
//     }

//     // Sort by timestamp (most recent first)
//     myRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//     // ✅ FIX: Display with sessionId and proper field names
//     tbody.innerHTML = myRecords.map(record => `
//         <tr>
//             <td>${record.date}</td>
//             <td>${record.sessionId}</td>
//             <td class="status-present">${record.status}</td>
//         </tr>
//     `).join('');
// }

// // ==================== PAGE LOAD HANDLERS ====================

// document.addEventListener('DOMContentLoaded', function() {
//     // Handle Enter key for login
//     const passwordInput = document.getElementById('password');
//     if (passwordInput) {
//         passwordInput.addEventListener('keypress', function(e) {
//             if (e.key === 'Enter') {
//                 login();
//             }
//         });
//     }
    
//     // Load teacher profile if on teacher page
//     if (window.location.pathname.includes('teacher.html')) {
//         loadTeacherProfile();
//         loadAttendanceRecords();
        
//         // Refresh attendance every 5 seconds to show new entries
//         setInterval(loadAttendanceRecords, 5000);
//     }
    
//     // Load student profile if on student page
//     if (window.location.pathname.includes('student.html')) {
//         loadStudentProfile();
//         loadMyAttendance();
//     }
// });




// // ==================== END OF SCRIPT ====================



// ==================== REGISTRATION SYSTEM ====================
// (Registration logic is in register.html file itself)

// ✅ FIX: Navigation to registration page
function navigateToRegister(event) {
    if (event) event.preventDefault();
    
    // Get current path and construct registration path
    const currentPath = window.location.pathname;
    const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    
    // Try multiple possible paths
    const possiblePaths = [
        'register.html',
        './register.html',
        currentDir + 'register.html',
        '../register.html'
    ];
    
    // Use the first path (register.html in same directory)
    window.location.href = 'register.html';
    return false;
}

// ==================== LOGIN SYSTEM ====================

let currentRole = '';

function showLogin(role) {
    currentRole = role;
    document.querySelector('.role-buttons').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('loginTitle').textContent = role.charAt(0).toUpperCase() + role.slice(1) + ' Login';
    document.getElementById('errorMsg').textContent = '';
}

function hideLogin() {
    document.querySelector('.role-buttons').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('systemId').value = '';
    document.getElementById('password').value = '';
    document.getElementById('errorMsg').textContent = '';
}

function login() {
    const systemId = document.getElementById('systemId').value.trim().toUpperCase();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    if (!systemId || !password) {
        errorMsg.textContent = 'Please enter System ID and Password!';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === systemId && u.password === password && u.role === currentRole);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('userRole', user.role);
        
        if (user.role === 'teacher') {
            window.location.href = 'teacher.html';
        } else if (user.role === 'student') {
            window.location.href = 'student.html';
        }
    } else {
        errorMsg.textContent = 'Invalid System ID or Password!';
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}

// ==================== TEACHER DASHBOARD ====================

function loadTeacherProfile() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user || user.role !== 'teacher') {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('teacherPhoto').src = user.photo;
    document.getElementById('teacherName').textContent = user.name;
    document.getElementById('teacherSystemId').textContent = user.id;
    document.getElementById('teacherDept').textContent = user.dept;
    
    loadSessionHistory();
}

function generateQR() {
    const sessionId = 'SESSION-' + Date.now();
    const timestamp = new Date().toISOString();
    
    const qrData = JSON.stringify({
        sessionId: sessionId,
        timestamp: timestamp
    });

    // Store current session
    localStorage.setItem('currentSession', qrData);
    
    // Save to sessions history
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    sessions.push({
        id: sessionId,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('sessions', JSON.stringify(sessions));

    // Display QR Code
    const qrDisplay = document.getElementById('qrDisplay');
    qrDisplay.classList.remove('hidden');

    // Generate QR using QRious library
    const qr = new QRious({
        element: document.getElementById('qrImage'),
        value: qrData,
        size: 300,
        level: 'H'
    });

    // Display QR info
    document.getElementById('qrId').textContent = sessionId;
    document.getElementById('qrTime').textContent = new Date(timestamp).toLocaleString();
    
    // Show QR data text for manual entry
    const qrDataText = document.getElementById('qrDataText');
    if (qrDataText) {
        qrDataText.value = qrData;
    }
    
    console.log('QR Generated:', qrData);
    alert('QR Code Generated Successfully! Students can now scan it.');
    
    loadSessionHistory();
}

// ✅ NEW FEATURE: Download QR Code as PNG
function downloadQR() {
    const qrImage = document.getElementById('qrImage');
    const sessionId = document.getElementById('qrId').textContent;
    
    if (!qrImage || !qrImage.src) {
        alert('Please generate a QR code first!');
        return;
    }
    
    // Create download link
    const link = document.createElement('a');
    link.download = `QR_${sessionId}.png`;
    link.href = qrImage.src;
    link.click();
    
    console.log('QR Code downloaded');
}

// ✅ NEW FEATURE: Share QR Code
async function shareQR() {
    const qrImage = document.getElementById('qrImage');
    const sessionId = document.getElementById('qrId').textContent;
    const qrData = document.getElementById('qrDataText').value;
    
    if (!qrImage || !qrImage.src) {
        alert('Please generate a QR code first!');
        return;
    }
    
    // Check if Web Share API is available
    if (navigator.share) {
        try {
            // Convert base64 to blob
            const response = await fetch(qrImage.src);
            const blob = await response.blob();
            const file = new File([blob], `QR_${sessionId}.png`, { type: 'image/png' });
            
            await navigator.share({
                title: 'Attendance QR Code',
                text: `Session ID: ${sessionId}\n\nQR Data: ${qrData}`,
                files: [file]
            });
            
            console.log('QR Code shared successfully');
        } catch (error) {
            console.log('Share failed, falling back to copy:', error);
            fallbackShareQR(qrData);
        }
    } else {
        // Fallback: Copy QR data to clipboard
        fallbackShareQR(qrData);
    }
}

function fallbackShareQR(qrData) {
    // Copy to clipboard
    const textarea = document.createElement('textarea');
    textarea.value = qrData;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    alert('QR Code data copied to clipboard! You can now share it via any messaging app.');
}

function loadSessionHistory() {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    const sessionList = document.getElementById('sessionList');
    
    if (sessions.length === 0) {
        sessionList.innerHTML = '<li style="color: #999; font-style: italic;">No sessions yet</li>';
        return;
    }
    
    sessionList.innerHTML = sessions.slice(-5).reverse().map(session => 
        `<li style="padding: 10px; border-bottom: 1px solid #e0e0e0;">
            <strong>${session.id}</strong> - ${session.date}
        </li>`
    ).join('');
}

function copyQRData() {
    const qrDataText = document.getElementById('qrDataText');
    qrDataText.select();
    document.execCommand('copy');
    alert('QR Data copied to clipboard!');
}

// ✅ FIX: Load attendance from shared attendanceRecords array with complete identity
function loadAttendanceRecords() {
    const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    const tbody = document.getElementById('attendanceBody');

    if (attendanceRecords.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">No attendance records yet</td></tr>';
        return;
    }

    // Sort by timestamp (most recent first)
    attendanceRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // ✅ FIX: Display complete student identity with date AND time
    tbody.innerHTML = attendanceRecords.map(record => `
        <tr>
            <td>${record.name}</td>
            <td>${record.systemId}</td>
            <td>${record.date} ${record.time}</td>
            <td>${record.sessionId}</td>
            <td class="status-present">${record.status}</td>
        </tr>
    `).join('');
}

function downloadCSV() {
    const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    
    if (attendanceRecords.length === 0) {
        alert('No attendance records to download!');
        return;
    }

    // ✅ FIX: CSV with complete student identity
    let csv = 'Student Name,System ID,Date,Time,Session ID,Status\n';
    attendanceRecords.forEach(record => {
        csv += `${record.name},${record.systemId},${record.date},${record.time},${record.sessionId},${record.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// ==================== STUDENT DASHBOARD ====================

function loadStudentProfile() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user || user.role !== 'student') {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('studentPhoto').src = user.photo;
    document.getElementById('studentName').textContent = user.name;
    document.getElementById('studentSystemId').textContent = user.id;
    document.getElementById('studentDept').textContent = user.dept;
    
    // ✅ FIX: Count attendance using systemId field
    const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    const myAttendance = attendanceRecords.filter(record => record.systemId === user.id);
    document.getElementById('totalAttendance').textContent = myAttendance.length;
}

// ==================== QR SCANNER ====================

let videoStream = null;
let scanInterval = null;
let isScanning = false;

function startScanner() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const scannerContainer = document.getElementById('scannerContainer');
    const scanResult = document.getElementById('scanResult');
    const stopBtn = document.getElementById('stopScanBtn');

    scannerContainer.classList.remove('hidden');
    stopBtn.classList.remove('hidden');
    scanResult.classList.add('hidden');
    isScanning = true;

    // Check if session exists first
    const currentSession = localStorage.getItem('currentSession');
    if (!currentSession) {
        scanResult.textContent = '⚠️ No active session from teacher. Please ask teacher to generate QR first.';
        scanResult.className = 'scan-result error';
        scanResult.classList.remove('hidden');
        stopScanner();
        return;
    }

    // Request camera
    const constraints = {
        video: {
            facingMode: { ideal: 'environment' },
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 }
        }
    };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        videoStream = stream;
        video.srcObject = stream;
        
        video.onloadedmetadata = () => {
            video.play();
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            console.log('Camera started:', video.videoWidth, 'x', video.videoHeight);
            
            setTimeout(() => {
                if (isScanning) {
                    scanInterval = setInterval(scanQRCode, 250);
                    console.log('Scanning started...');
                }
            }, 1000);
        };
    })
    .catch(err => {
        console.error('Camera error:', err);
        scanResult.textContent = '❌ Camera access denied! Please allow camera permissions and try again.';
        scanResult.className = 'scan-result error';
        scanResult.classList.remove('hidden');
        scannerContainer.classList.add('hidden');
        stopBtn.classList.add('hidden');
        isScanning = false;
    });
}

function stopScanner() {
    const video = document.getElementById('video');
    const scannerContainer = document.getElementById('scannerContainer');
    const stopBtn = document.getElementById('stopScanBtn');

    isScanning = false;

    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
    }

    if (scanInterval) {
        clearInterval(scanInterval);
        scanInterval = null;
    }

    video.srcObject = null;
    scannerContainer.classList.add('hidden');
    stopBtn.classList.add('hidden');
}

function scanQRCode() {
    if (!isScanning) return;

    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "attemptBoth",
        });

        if (code && code.data) {
            console.log('✅ QR Code detected:', code.data);
            isScanning = false;
            stopScanner();
            processQRCode(code.data);
        }
    }
}

// Manual QR Input
function processManualQR() {
    const manualQR = document.getElementById('manualQR').value.trim();
    const scanResult = document.getElementById('scanResult');
    
    if (!manualQR) {
        scanResult.textContent = '⚠️ Please paste the QR code data!';
        scanResult.className = 'scan-result error';
        scanResult.classList.remove('hidden');
        return;
    }
    
    processQRCode(manualQR);
}

// ✅ COMPLETE FIX: Upload QR Image - Fully Working Implementation
function uploadAndProcessQR() {
    const fileInput = document.getElementById('qrImageUpload');
    const scanResult = document.getElementById('scanResult');
    const canvas = document.getElementById('uploadCanvas');
    
    console.log('=== Upload QR Process Started ===');
    
    // Step 1: Validate file selection
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        console.error('No file selected');
        scanResult.textContent = '⚠️ Please select an image file first!';
        scanResult.className = 'scan-result error';
        scanResult.classList.remove('hidden');
        return;
    }
    
    const file = fileInput.files[0];
    console.log('File selected:', file.name, file.type, file.size, 'bytes');
    
    // Step 2: Validate file type
    if (!file.type.startsWith('image/')) {
        console.error('Invalid file type:', file.type);
        scanResult.textContent = '⚠️ Please select a valid image file (PNG, JPG, etc.)!';
        scanResult.className = 'scan-result error';
        scanResult.classList.remove('hidden');
        return;
    }
    
    // Step 3: Check if session exists
    const currentSession = localStorage.getItem('currentSession');
    if (!currentSession) {
        console.error('No active session found');
        scanResult.textContent = '⚠️ No active session from teacher. Please ask teacher to generate QR first.';
        scanResult.className = 'scan-result error';
        scanResult.classList.remove('hidden');
        return;
    }
    
    console.log('Active session found:', currentSession);
    
    // Step 4: Show processing message
    scanResult.textContent = '🔄 Processing image... Please wait.';
    scanResult.className = 'scan-result';
    scanResult.style.background = '#fff3cd';
    scanResult.style.color = '#856404';
    scanResult.style.border = '2px solid #ffeaa7';
    scanResult.classList.remove('hidden');
    
    // Step 5: Read the file
    const reader = new FileReader();
    
    reader.onerror = function() {
        console.error('FileReader error');
        scanResult.textContent = '❌ Failed to read the file! Please try again.';
        scanResult.className = 'scan-result error';
    };
    
    reader.onload = function(e) {
        console.log('File loaded successfully, creating image...');
        
        const img = new Image();
        
        img.onerror = function() {
            console.error('Image load error');
            scanResult.textContent = '❌ Failed to load image! Please try another file.';
            scanResult.className = 'scan-result error';
        };
        
        img.onload = function() {
            console.log('Image loaded:', img.width, 'x', img.height);
            
            try {
                // Step 6: Draw image on canvas
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                
                console.log('Drawing image on canvas...');
                ctx.drawImage(img, 0, 0, img.width, img.height);
                
                // Step 7: Get image data
                console.log('Extracting image data...');
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                console.log('Image data extracted:', imageData.width, 'x', imageData.height, 'pixels');
                
                // Step 8: Decode QR code using jsQR
                console.log('Attempting to decode QR code...');
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "attemptBoth",
                });
                
                if (code && code.data) {
                    console.log('✅ QR Code successfully decoded!');
                    console.log('QR Data:', code.data);
                    
                    // Clear the file input
                    fileInput.value = '';
                    
                    // Step 9: Process the decoded QR data
                    processQRCode(code.data);
                } else {
                    console.error('❌ No QR code found in image');
                    scanResult.textContent = '❌ No QR code found in the image! Please ensure:\n• The QR code is clear and not blurry\n• The entire QR code is visible\n• Try a better quality image';
                    scanResult.className = 'scan-result error';
                    scanResult.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error during QR processing:', error);
                scanResult.textContent = '❌ Error processing image: ' + error.message;
                scanResult.className = 'scan-result error';
                scanResult.classList.remove('hidden');
            }
        };
        
        // Set image source
        img.src = e.target.result;
    };
    
    // Start reading the file as data URL
    console.log('Starting to read file...');
    reader.readAsDataURL(file);
}

function processQRCode(qrData) {
    const scanResult = document.getElementById('scanResult');
    const currentSession = localStorage.getItem('currentSession');

    console.log('=== Processing QR Code ===');
    console.log('Scanned QR Data:', qrData);
    console.log('Current Session:', currentSession);

    if (!currentSession) {
        console.error('No current session found');
        scanResult.textContent = '❌ No active session from teacher. Please ask teacher to generate QR first.';
        scanResult.className = 'scan-result error';
        scanResult.classList.remove('hidden');
        return;
    }

    try {
        const scannedData = JSON.parse(qrData);
        const storedData = JSON.parse(currentSession);

        console.log('Scanned Session ID:', scannedData.sessionId);
        console.log('Stored Session ID:', storedData.sessionId);

        if (scannedData.sessionId === storedData.sessionId) {
            console.log('✅ Session IDs match! Marking attendance...');
            markAttendance(scannedData);
            scanResult.textContent = '✓ Attendance Marked Successfully!';
            scanResult.className = 'scan-result success';
            scanResult.classList.remove('hidden');
            console.log('✅ Attendance marked successfully!');
        } else {
            console.error('Session ID mismatch');
            scanResult.textContent = '❌ Invalid QR Code! Please scan the current QR from teacher.';
            scanResult.className = 'scan-result error';
            scanResult.classList.remove('hidden');
        }
    } catch (e) {
        console.error('QR Parse Error:', e);
        scanResult.textContent = '❌ Invalid QR Code format! Please scan the QR generated by teacher.';
        scanResult.className = 'scan-result error';
        scanResult.classList.remove('hidden');
    }
}

// ✅ FIX: Save to shared attendanceRecords array with complete student identity
function markAttendance(sessionData) {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const scanResult = document.getElementById('scanResult');
    
    // Check if already marked for this session
    const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    const alreadyMarked = attendanceRecords.some(
        record => record.systemId === user.id && record.sessionId === sessionData.sessionId
    );
    
    if (alreadyMarked) {
        scanResult.textContent = '⚠️ Attendance already marked for this session!';
        scanResult.className = 'scan-result error';
        scanResult.classList.remove('hidden');
        return;
    }

    const now = new Date();
    
    // ✅ FIX: Updated attendance record structure with complete identity
    const attendanceRecord = {
        name: user.name,                              // Student full name
        systemId: user.id,                            // System ID (STU123, etc)
        sessionId: sessionData.sessionId,             // Session ID
        date: now.toLocaleDateString(),               // Date
        time: now.toLocaleTimeString(),               // Time
        status: 'Present',                            // Status
        timestamp: now.toISOString()                  // For sorting
    };

    // Add to shared attendance records array
    attendanceRecords.push(attendanceRecord);
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    
    console.log('✅ Attendance saved successfully:', attendanceRecord);
    
    // Reload attendance display
    loadMyAttendance();
    
    // Update total count
    const myAttendance = attendanceRecords.filter(record => record.systemId === user.id);
    document.getElementById('totalAttendance').textContent = myAttendance.length;
}

function loadMyAttendance() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    const tbody = document.getElementById('myAttendanceBody');

    // Filter records for current student using systemId
    const myRecords = attendanceRecords.filter(record => record.systemId === user.id);

    if (myRecords.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="no-data">No attendance records yet</td></tr>';
        return;
    }

    // Sort by timestamp (most recent first)
    myRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // ✅ FIX: Display with sessionId and proper field names
    tbody.innerHTML = myRecords.map(record => `
        <tr>
            <td>${record.date}</td>
            <td>${record.sessionId}</td>
            <td class="status-present">${record.status}</td>
        </tr>
    `).join('');
}

// ==================== PAGE LOAD HANDLERS ====================

document.addEventListener('DOMContentLoaded', function() {
    // Handle Enter key for login
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                login();
            }
        });
    }
    
    // Load teacher profile if on teacher page
    if (window.location.pathname.includes('teacher.html')) {
        loadTeacherProfile();
        loadAttendanceRecords();
        
        // Refresh attendance every 5 seconds to show new entries
        setInterval(loadAttendanceRecords, 5000);
    }
    
    // Load student profile if on student page
    if (window.location.pathname.includes('student.html')) {
        loadStudentProfile();
        loadMyAttendance();
    }
});
