let selectedRow = null;

async function loadPatients() {
  try {
    console.log('Fetching patient data...');
    const response = await fetch('/patients');
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Fetched data:', data);

    const tableBody = document.querySelector('#patientsTable tbody');
    tableBody.innerHTML = '';
    data.forEach(patient => {
      const row = document.createElement('tr');
      row.style.backgroundColor = 'white';
      row.innerHTML = `
        <td>${patient.patient_ID || ''}</td>
        <td contenteditable="false">${patient.PatientName}</td>
        <td contenteditable="false">${patient.VaccineName}</td>
        <td contenteditable="false">${patient.Quantity}</td>
        <td contenteditable="false">${patient.PurchaseDate.split('T')[0]}</td>
        <td>
          <button onclick="editPatient(this)" style="background-color: #73A8E6; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Edit</button>
          <button onclick="savePatient(this)" style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-left: 5px;">Save</button>
          <button onclick="deletePatient(this)" style="background-color: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-left: 5px;">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching patient data:', error);
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

function editPatient(button) {
  const row = button.parentElement.parentElement;
  const cells = row.children;
  for (let i = 1; i < cells.length - 1; i++) {
    cells[i].setAttribute('contenteditable', 'true');
  }
}

async function savePatient(button) {
  const row = button.parentElement.parentElement;
  const updatedData = {
    patient_ID: row.children[0].textContent,
    PatientName: row.children[1].textContent,
    VaccineName: row.children[2].textContent,
    Quantity: row.children[3].textContent,
    PurchaseDate: row.children[4].textContent
  };

  try {
    const response = await fetch(`/patients/${updatedData.patient_ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    if (response.ok) {
      alert('The row has been successfully saved');
      for (let i = 1; i < row.children.length - 1; i++) {
        row.children[i].setAttribute('contenteditable', 'false');
      }
      await loadPatients();
    } else {
      const errorData = await response.json();
      alert(`Failed to save patient: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error saving patient data:', error);
    alert('An error occurred. Please try again later.');
  }
}

async function deletePatient(button) {
  const row = button.parentElement.parentElement;
  const patientID = row.children[0].textContent;

  if (!confirm('Are you sure you want to delete this patient record?')) return;

  try {
    const response = await fetch(`/patients/${patientID}`, { method: 'DELETE' });
    if (response.ok) {
      row.remove();
      alert('Patient deleted successfully');
    } else {
      const errorData = await response.json();
      alert(`Failed to delete patient: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error deleting patient data:', error);
    alert('An error occurred. Please try again later.');
  }
}

function searchPatients() {
  const searchTerm = document.getElementById('searchBar').value.toLowerCase();
  const rows = document.querySelectorAll('#patientsTable tbody tr');
  rows.forEach(row => {
    const patientName = row.children[1].textContent.toLowerCase();
    row.style.display = patientName.includes(searchTerm) ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadPatients();
  loadWelcomeMessage();

  const refreshButton = document.createElement('button');
  refreshButton.textContent = 'Refresh IDs';
  refreshButton.style.backgroundColor = '#4CAF50';
  refreshButton.style.color = 'white';
  refreshButton.style.border = 'none';
  refreshButton.style.padding = '10px 20px';
  refreshButton.style.borderRadius = '5px';
  refreshButton.style.cursor = 'pointer';
  refreshButton.style.marginTop = '10px';
  refreshButton.onclick = refreshPatientIDs;

  document.getElementById('patientsTable').parentElement.appendChild(refreshButton);
});

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