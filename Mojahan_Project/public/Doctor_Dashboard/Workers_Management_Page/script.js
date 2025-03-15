document.addEventListener('DOMContentLoaded', () => {
  loadWelcomeMessage();
  fetchDoctors();
  fetchAssistants();
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

function fetchDoctors() {
  fetch('/doctors')
    .then(response => response.json())
    .then(doctors => {
      const doctorsList = document.getElementById('doctorsList');
      doctorsList.innerHTML = '';
      doctors.forEach(doctor => {
        const doctorItem = document.createElement('li');
        doctorItem.style.background = '#89CFF0';
        doctorItem.style.color = 'white';
        doctorItem.style.padding = '10px';
        doctorItem.style.marginBottom = '10px';
        doctorItem.style.borderRadius = '5px';
        const formattedDate = doctor.effectivity_date.split('T')[0];
        doctorItem.innerHTML = `
          <strong>Doctor ID:</strong> ${doctor.doctor_ID}<br>
          <strong>Name:</strong> ${doctor.dr_firstname} ${doctor.dr_Middlename} ${doctor.dr_Surname}<br>
          <strong>Gender:</strong> ${doctor.dr_Gender}<br>
          <strong>Age:</strong> ${doctor.dr_age}<br>
          <strong>Contact Number:</strong> ${doctor.dr_number}<br>
          <strong>Address:</strong> ${doctor.dr_address}<br>
          <strong>Effectivity Date:</strong> ${formattedDate}<br>
          <strong>License:</strong> ${doctor.dr_License}
        `;
        doctorsList.appendChild(doctorItem);
      });
    })
    .catch(error => console.error('Error fetching doctors:', error));
}

function fetchAssistants() {
  fetch('/assistants')
    .then(response => response.json())
    .then(assistants => {
      const assistantsList = document.getElementById('assistantsList');
      assistantsList.innerHTML = '';
      assistants.forEach(assistant => {
        const assistantItem = document.createElement('li');
        assistantItem.style.background = '#89CFF0';
        assistantItem.style.color = 'white';
        assistantItem.style.padding = '10px';
        assistantItem.style.marginBottom = '10px';
        assistantItem.style.borderRadius = '5px';
        const formattedDate = assistant.date_hired.split('T')[0]; // Only keeps YYYY-MM-DD
        assistantItem.innerHTML = `
          <strong>Assistant ID:</strong> ${assistant.assistant_ID}<br>
          <strong>Username:</strong> ${assistant.username}<br>
          <strong>Date Hired:</strong> ${formattedDate}<br>
          <strong>Description:</strong> ${assistant.description}
        `;
        assistantsList.appendChild(assistantItem);
      });
    })
    .catch(error => console.error('Error fetching assistants:', error));
}

