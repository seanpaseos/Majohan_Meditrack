async function fetchSuppliers() {
    try {
      const response = await fetch('/suppliers');
      if (!response.ok) {
        throw new Error('Failed to fetch suppliers');
      }
      const suppliers = await response.json();
      displaySuppliers(suppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  }
  
  function displaySuppliers(suppliers) {
    const tableBody = document.getElementById('supplierTableBody');
    tableBody.innerHTML = '';
    suppliers.forEach(supplier => {
      const row = `<tr>
        <td>${supplier.supplier_ID}</td>
        <td>${supplier.supplier_name}</td>
        <td>${supplier.contact}</td>
        <td>${supplier.location}</td>
      </tr>`;
      tableBody.innerHTML += row;
    });
  }
  
  async function openSupplierForm() {
    const formHtml = `
      <div id="formPopup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.8); opacity: 0; background: #89CFF0; padding: 40px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 400px; color: white; transition: transform 0.3s ease-out, opacity 0.3s ease-out;">
        <h2 style="text-align: center; margin-bottom: 20px;">Record Supplier</h2>
        <form id="supplierForm">
          <label style="display: block; margin-bottom: 10px;">Supplier Name: <input type="text" id="supplierName" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
          <label style="display: block; margin-bottom: 10px;">Contact: <input type="text" id="supplierContact" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
          <label style="display: block; margin-bottom: 20px;">Location: <input type="text" id="supplierLocation" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; margin-top: 5px;" required /></label>
          <div style="display: flex; justify-content: space-between;">
            <button type="submit" style="background-color: #73A8E6; padding: 10px 20px; border-radius: 5px;">Submit</button>
            <button type="button" onclick="closeSupplierForm()" style="background-color: #ccc; padding: 10px 20px; border-radius: 5px; color: black;">Cancel</button>
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
  
    document.getElementById('supplierForm').addEventListener('submit', addSupplier);
  }
  
  function closeSupplierForm() {
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
  
  async function addSupplier(e) {
    e.preventDefault();
    const supplierData = {
      supplier_name: document.getElementById('supplierName').value,
      contact: document.getElementById('supplierContact').value,
      location: document.getElementById('supplierLocation').value
    };
    try {
      const response = await fetch('/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData)
      });
      if (response.ok) {
        alert('Supplier added successfully!');
        window.location.href = '/Supplier_page/index.html';
      } else {
        const errorData = await response.json();
        alert(`Failed to add supplier: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('An error occurred. Please try again later.');
    }
  }
  
  document.addEventListener('DOMContentLoaded', fetchSuppliers);
  