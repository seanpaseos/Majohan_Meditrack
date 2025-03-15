async function openOrderForm() {
    const formHtml = `
      <div id="formPopup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.8); opacity: 0; background: #89CFF0; padding: 40px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 400px; color: white; transition: transform 0.3s ease-out, opacity 0.3s ease-out;">
        <h2 style="text-align: center; margin-bottom: 20px;">Record Vaccine Order</h2>
        <form id="orderForm">
          <label style="display: block; margin-bottom: 10px;">Vaccine Name: <input type="text" id="vaccineName" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
          <label style="display: block; margin-bottom: 10px;">Opening Stock: <input type="number" id="openingStock" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
          <label style="display: block; margin-bottom: 10px;">Purchased: <input type="number" id="purchased" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
          <label style="display: block; margin-bottom: 10px;">Dispensed: <input type="number" id="dispensed" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
          <label style="display: block; margin-bottom: 10px;">Order Date: <input type="date" id="orderDate" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
          <div style="display: flex; justify-content: space-between;">
            <button type="submit" style="background-color: #73A8E6; padding: 10px 20px; border-radius: 5px;">Submit</button>
            <button type="button" onclick="closeOrderForm()" style="background-color: rgb(214, 110, 110); padding: 10px 20px; border-radius: 5px; color: black;">Cancel</button>
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
  
    document.getElementById('orderForm').addEventListener('submit', submitOrderForm);
  }
  
  function closeOrderForm() {
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
  
  async function submitOrderForm(e) {
    e.preventDefault();
  
    const orderDate = document.getElementById('orderDate').value;
  
    const vaccineData = {
      VaccineName: document.getElementById('vaccineName').value,
      OpeningStock: document.getElementById('openingStock').value,
      Purchased: document.getElementById('purchased').value,
      Dispensed: document.getElementById('dispensed').value,
      OrderDate: orderDate
    };
  
    try {
      const response = await fetch('/vaccines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vaccineData)
      });
  
      if (response.ok) {
        alert('Vaccine record added successfully!');
        window.location.href = '../Vaccine_Inventory/index.html';
      } else {
        const errorData = await response.json();
        alert(`Failed to add vaccine record: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding vaccine record:', error);
      alert('An error occurred. Please try again later.');
    }
  
    closeOrderForm();
  }
  