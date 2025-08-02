document.addEventListener('DOMContentLoaded', () => {
    // Prevent unauthorized access to dashboard
    if (window.location.pathname.includes('dashboard.html') && !localStorage.getItem('isLoggedIn')) {
        console.log('Unauthorized access to dashboard, redirecting to login.html');
        window.location.href = 'login.html';
        return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Login handler
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        console.log('Login button found, attaching event listener');
        loginButton.addEventListener('click', () => {
            console.log('Login button clicked');
            const email = document.getElementById('loginEmail')?.value.trim();
            const password = document.getElementById('loginPassword')?.value.trim();
            const message = document.getElementById('loginMessage');

            if (!email || !password) {
                console.log('Missing email or password');
                message.textContent = 'Please fill all fields.';
                return;
            }
            if (!emailRegex.test(email)) {
                console.log('Invalid email format:', email);
                message.textContent = 'Please enter a valid email address.';
                return;
            }
            if (password.length < 6) {
                console.log('Password too short');
                message.textContent = 'Password must be at least 6 characters.';
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);
            if (!user) {
                console.log('Invalid credentials for email:', email);
                message.textContent = 'Invalid email or password.';
                return;
            }

            console.log('Login successful for user:', email);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        });
    } else if (window.location.pathname.includes('login.html')) {
        console.warn('Login button not found on login.html');
    }

    // Signup handler
    const signupButton = document.getElementById('signupButton');
    if (signupButton) {
        console.log('Signup button found, attaching event listener');
        signupButton.addEventListener('click', () => {
            console.log('Signup button clicked');
            const username = document.getElementById('signupUsername')?.value.trim();
            const email = document.getElementById('signupEmail')?.value.trim();
            const password = document.getElementById('signupPassword')?.value.trim();
            const message = document.getElementById('signupMessage');

            if (!username || !email || !password) {
                console.log('Missing signup fields');
                message.textContent = 'Please fill all fields.';
                return;
            }
            if (!emailRegex.test(email)) {
                console.log('Invalid email format:', email);
                message.textContent = 'Please enter a valid email address.';
                return;
            }
            if (password.length < 6) {
                console.log('Password too short');
                message.textContent = 'Password must be at least 6 characters.';
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.email === email)) {
                console.log('Email already registered:', email);
                message.textContent = 'Email already registered.';
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            console.log('Signup successful for user:', email);
            message.textContent = 'Signup successful! Redirecting to login...';
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    } else if (window.location.pathname.includes('signup.html')) {
        console.warn('Signup button not found on signup.html');
    }

    // Logout handler
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        console.log('Logout button found, attaching event listener');
        logoutButton.addEventListener('click', () => {
            console.log('Logout button clicked');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }

    // Hostel Management Logic
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    const totalRooms = 50;
    let rooms = JSON.parse(localStorage.getItem('rooms')) || Array(totalRooms).fill().map((_, i) => ({
        number: i + 1,
        status: 'Vacant'
    }));

    // Profile handler
    const profileButton = document.getElementById('profileButton');
    if (profileButton) {
        console.log('Profile button found, attaching event listener');
        profileButton.addEventListener('click', () => {
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('bg-blue-700'));
            document.querySelector('[data-tab="profile"]').classList.add('bg-blue-700');
            document.getElementById('profile').classList.add('active');
        });

        const profileInfo = document.getElementById('profileInfo');
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        if (profileInfo) {
            profileInfo.innerHTML = `<strong>Username:</strong> ${currentUser.username || 'N/A'}<br><strong>Email:</strong> ${currentUser.email || 'N/A'}`;
        }
    }

    // Update password handler
    const updatePasswordButton = document.getElementById('updatePassword');
    if (updatePasswordButton) {
        console.log('Update password button found, attaching event listener');
        updatePasswordButton.addEventListener('click', () => {
            const newPassword = document.getElementById('newPassword')?.value.trim();
            const message = document.getElementById('profileMessage');
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

            if (!newPassword) {
                console.log('Missing new password');
                message.textContent = 'Please enter a new password.';
                return;
            }
            if (newPassword.length < 6) {
                console.log('New password too short');
                message.textContent = 'Password must be at least 6 characters.';
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
                console.log('Password updated for user:', currentUser.email);
                message.textContent = 'Password updated successfully!';
                document.getElementById('newPassword').value = '';
            } else {
                console.log('User not found for password update');
                message.textContent = 'Error updating password.';
            }
        });
    }

    // Tab navigation
    const tabs = document.querySelectorAll('.tab-button');
    if (tabs.length > 0) {
        console.log('Tabs found, initializing tab navigation');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                console.log('Tab clicked:', tab.dataset.tab);
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                tabs.forEach(t => t.classList.remove('bg-blue-700'));
                tab.classList.add('bg-blue-700');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });
        tabs[0].click();
    }

    // Room allocation
    const allocateRoomButton = document.getElementById('allocateRoom');
    if (allocateRoomButton) {
        console.log('Allocate room button found, attaching event listener');
        allocateRoomButton.addEventListener('click', () => {
            console.log('Allocate room button clicked');
            const name = document.getElementById('studentName')?.value.trim();
            const room = parseInt(document.getElementById('roomNumber')?.value);
            const contact = document.getElementById('contact')?.value.trim();
            const message = document.getElementById('allocateMessage');

            if (!name || !room || !contact) {
                console.log('Missing room allocation fields');
                message.textContent = 'Please fill all fields.';
                return;
            }
            if (room < 1 || room > totalRooms) {
                console.log('Invalid room number:', room);
                message.textContent = `Room number must be between 1 and ${totalRooms}.`;
                return;
            }
            if (rooms[room - 1].status === 'Occupied') {
                console.log('Room already occupied:', room);
                message.textContent = 'Room is already occupied.';
                return;
            }

            students.push({ name, room, contact });
            rooms[room - 1].status = 'Occupied';
            localStorage.setItem('students', JSON.stringify(students));
            localStorage.setItem('rooms', JSON.stringify(rooms));
            console.log('Room allocated:', { name, room, contact });
            message.textContent = 'Room allocated successfully!';
            document.getElementById('studentName').value = '';
            document.getElementById('roomNumber').value = '';
            document.getElementById('contact').value = '';
            updateStudentTable();
            updateRoomTable();
            updateAnalytics();
        });
    }

    // Student search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        console.log('Search input found, attaching event listener');
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            console.log('Search query:', query);
            updateStudentTable(query);
        });
    }

    // Complaint submission
    const submitComplaintButton = document.getElementById('submitComplaint');
    if (submitComplaintButton) {
        console.log('Submit complaint button found, attaching event listener');
        submitComplaintButton.addEventListener('click', () => {
            console.log('Submit complaint button clicked');
            const name = document.getElementById('complaintName')?.value.trim();
            const room = parseInt(document.getElementById('complaintRoom')?.value);
            const text = document.getElementById('complaintText')?.value.trim();
            const message = document.getElementById('complaintMessage');

            if (!name || !room || !text) {
                console.log('Missing complaint fields');
                message.textContent = 'Please fill all fields.';
                return;
            }
            if (room < 1 || room > totalRooms) {
                console.log('Invalid room number for complaint:', room);
                message.textContent = `Room number must be between 1 and ${totalRooms}.`;
                return;
            }

            complaints.push({ name, room, text, date: new Date().toLocaleString(), status: 'Pending' });
            localStorage.setItem('complaints', JSON.stringify(complaints));
            console.log('Complaint submitted:', { name, room, text });
            message.textContent = 'Complaint submitted successfully!';
            document.getElementById('complaintName').value = '';
            document.getElementById('complaintRoom').value = '';
            document.getElementById('complaintText').value = '';
            updateComplaintList();
            updateAnalytics();
        });
    }

    // Update student table
    function updateStudentTable(query = '') {
        const table = document.getElementById('studentTable');
        if (table) {
            console.log('Updating student table with query:', query);
            table.innerHTML = '';
            const filteredStudents = students.filter(student =>
                student.name.toLowerCase().includes(query) || student.room.toString().includes(query)
            );
            filteredStudents.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="border p-2">${student.name}</td>
                    <td class="border p-2">${student.room}</td>
                    <td class="border p-2">${student.contact}</td>
                    <td class="border p-2">
                        <button class="deallocate-button px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" data-room="${student.room}"><i class="fas fa-trash mr-1"></i>Deallocate</button>
                    </td>
                `;
                table.appendChild(row);
            });

            // Attach deallocate handlers
            document.querySelectorAll('.deallocate-button').forEach(button => {
                button.addEventListener('click', () => {
                    const room = parseInt(button.dataset.room);
                    console.log('Deallocate button clicked for room:', room);
                    students = students.filter(student => student.room !== room);
                    rooms[room - 1].status = 'Vacant';
                    localStorage.setItem('students', JSON.stringify(students));
                    localStorage.setItem('rooms', JSON.stringify(rooms));
                    updateStudentTable(query);
                    updateRoomTable();
                    updateAnalytics();
                });
            });
        }
    }

    // Update room table
    function updateRoomTable() {
        const table = document.getElementById('roomTable');
        if (table) {
            console.log('Updating room table');
            table.innerHTML = '';
            rooms.forEach(room => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="border p-2">${room.number}</td>
                    <td class="border p-2 ${room.status === 'Vacant' ? 'text-green-500' : 'text-red-500'}">${room.status}</td>
                `;
                table.appendChild(row);
            });
        }
    }

    // Update complaint list
    function updateComplaintList() {
        const list = document.getElementById('complaintList');
        if (list) {
            console.log('Updating complaint list');
            list.innerHTML = '';
            complaints.forEach((complaint, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${complaint.name}</strong> (Room ${complaint.room}) - ${complaint.text} 
                    <span class="${complaint.status === 'Resolved' ? 'text-green-500' : 'text-yellow-500'}">[${complaint.status}]</span>
                    <em>(${complaint.date})</em>
                    <button class="toggle-status px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2" data-index="${index}">
                        <i class="fas fa-sync-alt mr-1"></i>Toggle Status
                    </button>
                `;
                list.appendChild(li);
            });

            // Attach toggle status handlers
            document.querySelectorAll('.toggle-status').forEach(button => {
                button.addEventListener('click', () => {
                    const index = parseInt(button.dataset.index);
                    console.log('Toggle status for complaint:', index);
                    complaints[index].status = complaints[index].status === 'Pending' ? 'Resolved' : 'Pending';
                    localStorage.setItem('complaints', JSON.stringify(complaints));
                    updateComplaintList();
                    updateAnalytics();
                });
            });
        }
    }

    // Update analytics
    function updateAnalytics() {
        const totalRoomsEl = document.getElementById('totalRooms');
        const occupiedRoomsEl = document.getElementById('occupiedRooms');
        const unresolvedComplaintsEl = document.getElementById('unresolvedComplaints');
        const roomChart = document.getElementById('roomChart');

        if (totalRoomsEl && occupiedRoomsEl && unresolvedComplaintsEl && roomChart) {
            console.log('Updating analytics');
            const occupied = rooms.filter(room => room.status === 'Occupied').length;
            const unresolved = complaints.filter(complaint => complaint.status === 'Pending').length;

            totalRoomsEl.textContent = totalRooms;
            occupiedRoomsEl.textContent = occupied;
            unresolvedComplaintsEl.textContent = unresolved;

            const ctx = roomChart.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Occupied', 'Vacant'],
                    datasets: [{
                        label: 'Room Status',
                        data: [occupied, totalRooms - occupied],
                        backgroundColor: ['#3b82f6', '#10b981'],
                        borderColor: ['#1d4ed8', '#047857'],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        }
    }

    console.log('Initializing tables and lists');
    updateStudentTable();
    updateRoomTable();
    updateComplaintList();
    updateAnalytics();
});