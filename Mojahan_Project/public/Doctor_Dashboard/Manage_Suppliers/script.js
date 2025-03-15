document.addEventListener('DOMContentLoaded', fetchSuppliers);

function fetchSuppliers() {
  fetch('/suppliers')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#supplierTable tbody');
      tableBody.innerHTML = '';
      data.forEach(supplier => {
        const row = document.createElement('tr');
        row.style.backgroundColor = 'white';
        row.innerHTML = `
          <td>${supplier.supplier_ID}</td>
          <td contenteditable="false">${supplier.supplier_name}</td>
          <td contenteditable="false">${supplier.contact}</td>
          <td contenteditable="false">${supplier.location}</td>
          <td>
            <button onclick="editSupplier(this)" style="background-color: #73A8E6; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Edit</button>
            <button onclick="saveSupplier(this)" style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-left: 5px;">Save</button>
            <button onclick="deleteSupplier(${supplier.supplier_ID})" style="background-color: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-left: 5px;">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(err => console.error('Error fetching suppliers:', err));
}

function editSupplier(button) {
  const row = button.parentElement.parentElement;
  const cells = row.children;
  for (let i = 1; i < cells.length - 1; i++) {
    cells[i].setAttribute('contenteditable', 'true');
  }
}

async function saveSupplier(button) {
  const row = button.parentElement.parentElement;
  const updatedData = {
    supplier_ID: row.children[0].textContent,
    supplier_name: row.children[1].textContent,
    contact: row.children[2].textContent,
    location: row.children[3].textContent
  };

  try {
    const response = await fetch(`/suppliers/${updatedData.supplier_ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    if (response.ok) {
      alert('Supplier record successfully saved');
      for (let i = 1; i < row.children.length - 1; i++) {
        row.children[i].setAttribute('contenteditable', 'false');
      }
      fetchSuppliers();
    } else {
      const errorData = await response.json();
      alert(`Failed to save supplier: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error saving supplier data:', error);
    alert('An error occurred. Please try again later.');
  }
}

function deleteSupplier(id) {
  if (confirm('Are you sure you want to remove this supplier?')) {
    fetch(`/suppliers/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => fetchSuppliers())
      .catch(err => console.error('Error deleting supplier:', err));
  }
}

function searchSuppliers() {
  const searchTerm = document.getElementById('searchBar').value.toLowerCase();
  const rows = document.querySelectorAll('#supplierTable tbody tr');
  rows.forEach(row => {
    const supplierName = row.children[1].textContent.toLowerCase();
    row.style.display = supplierName.includes(searchTerm) ? '' : 'none';
  });
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
