async function openPatientForm() {
  const formHtml = `
    <div id="formPopup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.8); opacity: 0; background: #89CFF0; padding: 40px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 400px; color: white; transition: transform 0.3s ease-out, opacity 0.3s ease-out;">
      <h2 style="text-align: center; margin-bottom: 20px;">Record a Patient</h2>
      <form id="patientForm">
        <label style="display: block; margin-bottom: 10px;">Name: <input type="text" id="patientName" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
        <label style="display: block; margin-bottom: 10px;">Vaccine: <input type="text" id="vaccine" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
        <label style="display: block; margin-bottom: 10px;">Quantity: <input type="number" id="quantity" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
        <label style="display: block; margin-bottom: 20px;">Purchase Date: <input type="date" id="purchaseDate" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
        <div style="display: flex; justify-content: space-between;">
          <button type="submit" style="background-color: #73A8E6; padding: 10px 20px; border-radius: 5px;">Submit</button>
          <button type="button" onclick="closePatientForm()" style="background-color:rgb(214, 110, 110); padding: 10px 20px; border-radius: 5px; color: black;">Cancel</button>
        </div>
      </form>
    </div>
  `;
  const formContainer = document.createElement('div');
  formContainer.id = 'popupContainer';
  formContainer.style.position = 'fixed';
  formContainer.style.top = '0';
  formContainer.style.left = '0';
  formContainer.style.width = '100%';
  formContainer.style.height = '100%';
  formContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  formContainer.style.display = 'flex';
  formContainer.style.alignItems = 'center';
  formContainer.style.justifyContent = 'center';
  formContainer.innerHTML = formHtml;
  document.body.appendChild(formContainer);

  setTimeout(() => {
    const formPopup = document.getElementById('formPopup');
    formPopup.style.transform = 'translate(-50%, -50%) scale(1)';
    formPopup.style.opacity = '1';
  }, 10);

  document.getElementById('patientForm').addEventListener('submit', submitPatientForm);
}

function closePatientForm() {
  const formPopup = document.getElementById('formPopup');
  if (formPopup) {
    formPopup.style.transform = 'translate(-50%, -50%) scale(0.8)';
    formPopup.style.opacity = '0';
    setTimeout(() => {
      const formContainer = document.getElementById('popupContainer');
      if (formContainer) document.body.removeChild(formContainer);
    }, 300);
  }
}

async function submitPatientForm(e) {
  e.preventDefault();

  const patientName = document.getElementById('patientName').value;
  const vaccineName = document.getElementById('vaccine').value;
  const quantity = document.getElementById('quantity').value;
  const purchaseDate = document.getElementById('purchaseDate').value;

  const patientData = { PatientName: patientName, VaccineName: vaccineName, Quantity: quantity, PurchaseDate: purchaseDate };

  try {
    const response = await fetch('/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData)
    });

    if (response.ok) {
      alert('Patient record added successfully!');
      window.location.href = 'record.html';
    } else {
      const errorData = await response.json();
      alert(`Failed to add patient: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error adding patient:', error);
    alert('An error occurred. Please try again later.');
  }

  closePatientForm();
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
