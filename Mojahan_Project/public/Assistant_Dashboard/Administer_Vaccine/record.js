document.addEventListener('DOMContentLoaded', () => {
    fetchAdministeredRecords();
    loadWelcomeMessage();
});

async function fetchAdministeredRecords(searchQuery = '') {
    try {
        const response = await fetch('/administer');
        const data = await response.json();
        console.log(data);

        const filteredData = searchQuery
            ? data.filter(record => record.Administer_ID.toString() === searchQuery)
            : data;

        const tableBody = document.querySelector('#administeredTable tbody');
        tableBody.innerHTML = '';

        filteredData.forEach(record => {
            const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : '';

            const row = document.createElement('tr');
            row.style.backgroundColor = 'white';
            row.innerHTML = `
                <td>${record.Administer_ID}</td>
                <td>${record.patient_ID}</td>
                <td>${record.vaccine_ID || 'N/A'}</td>
                <td>${record.assistant_ID}</td>
                <td>${record.doctor_ID}</td>
                <td>${formatDate(record.date)}</td>
                <td>
                    <button onclick="deleteRecord(${record.Administer_ID})" style="background-color: #d66e6e; color: white; border: none; padding: 5px 10px; border-radius: 5px;">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching administered records:', error);
    }
}

function searchAdministeredRecords() {
    const searchQuery = document.getElementById('searchBar').value.trim();
    fetchAdministeredRecords(searchQuery);
}

async function deleteRecord(Administer_ID) {
    if (confirm('Are you sure you want to delete this record?')) {
        try {
            const response = await fetch(`/administer/${Administer_ID}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                fetchAdministeredRecords();
            } else {
                alert('Failed to delete record');
            }
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    }
}

async function loadWelcomeMessage() {
    try {
        const response = await fetch('/user-role');
        const { role } = await response.json();
        const welcomeMessage = role === 'doctor' ? 'Welcome, Doctor' : 'Welcome, Secretary';
        document.getElementById('welcomeMessage').textContent = welcomeMessage;
    } catch (error) {
        console.error('Error loading welcome message:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadWelcomeMessage();
});
