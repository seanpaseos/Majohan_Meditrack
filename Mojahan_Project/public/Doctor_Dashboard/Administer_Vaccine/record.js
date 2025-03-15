document.addEventListener('DOMContentLoaded', () => {
    fetchAdministeredRecords();
    loadWelcomeMessage();
});

async function fetchAdministeredRecords(searchQuery = '') {
    try {
        const response = await fetch('/administer');
        const data = await response.json();
        console.log(data);

        const filteredData = data.filter(record => 
            record.Administer_ID.toString().includes(searchQuery)
        );

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
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching administered records:', error);
    }
}

function searchAdministeredRecords() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    fetchAdministeredRecords(searchQuery);
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
