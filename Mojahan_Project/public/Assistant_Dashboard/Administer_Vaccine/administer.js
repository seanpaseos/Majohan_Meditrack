async function openAdministerForm() {
    const formHtml = `
      <div id="formPopup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.8); opacity: 0; background: #89CFF0; padding: 40px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 400px; color: white; transition: transform 0.3s ease-out, opacity 0.3s ease-out;">
        <h2 style="text-align: center; margin-bottom: 20px;">Administer Vaccine Form</h2>
        <form id="administerForm">
          <label style="display: block; margin-bottom: 10px;">Patient ID: <input type="text" id="patientId" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
          <label style="display: block; margin-bottom: 10px;">Vaccine ID: <input type="text" id="vaccineId" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
          <label style="display: block; margin-bottom: 10px;">Assistant ID: 
            <select id="assistantId" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </label>
          <label style="display: block; margin-bottom: 20px;">Doctor ID: 
            <select id="doctorId" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </label>
          <label style="display: block; margin-bottom: 25px;">Administer Date: <input type="date" id="administerDate" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
          <div style="display: flex; justify-content: space-between;">
            <button type="submit" style="background-color: #4CAF50; padding: 12px 25px; border-radius: 8px; border: none; color: white; font-weight: bold; cursor: pointer;">Submit</button>
            <button type="button" onclick="closeAdministerForm()" style="background-color: #f44336; padding: 12px 25px; border-radius: 8px; border: none; color: white; font-weight: bold; cursor: pointer;">Cancel</button>
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
    document.getElementById('administerForm').addEventListener('submit', submitAdministerForm);
  }

  function closeAdministerForm() {
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
  async function submitAdministerForm(event) {
    event.preventDefault();

    const patientId = document.getElementById('patientId').value;
    const vaccineId = document.getElementById('vaccineId').value;
    const assistantId = document.getElementById('assistantId').value;
    const doctorId = document.getElementById('doctorId').value;
    const administerDate = document.getElementById('administerDate').value;

    try {
        const response = await fetch('/administer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patientId,
                vaccineId,
                assistantId,
                doctorId,
                administerDate
            })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message); // Successfully administered
            closeAdministerForm();
        } else {
            alert(data.message); // Show error message (ID does not exist)
        }
    } catch (error) {
        console.error('Error submitting administer form:', error);
        alert('An error occurred while submitting the form.');
    }
}

  document.addEventListener('DOMContentLoaded', () => {
    loadWelcomeMessage();

  });