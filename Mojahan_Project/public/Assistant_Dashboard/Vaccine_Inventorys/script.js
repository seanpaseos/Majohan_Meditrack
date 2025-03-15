let selectedRow = null;

document.addEventListener('DOMContentLoaded', fetchVaccines);

function fetchVaccines() {
  fetch('/vaccines')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#vaccineTable tbody');
      tableBody.innerHTML = '';
      data.forEach(vaccine => {
        const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : '';

        const row = document.createElement('tr');
        row.style.backgroundColor = 'white';
        row.innerHTML = `
          <td>${vaccine.vaccine_ID}</td>
          <td contenteditable="false">${vaccine.vaccine_name}</td>
          <td contenteditable="false">${vaccine.opening_stock}</td>
          <td contenteditable="false">${vaccine.purchased}</td>
          <td contenteditable="false">${vaccine.total_stock}</td>
          <td contenteditable="false">${vaccine.dispensed}</td>
          <td contenteditable="false">${vaccine.closing_stock}</td>
          <td contenteditable="false">${formatDate(vaccine.order_date)}</td>
          <td>
            <button onclick="editVaccine(this)" style="background-color: #73A8E6; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Edit</button>
            <button onclick="saveVaccine(this)" style="background-color: #4CAF50; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-left: 5px;">Save</button>
            <button onclick="removeVaccine(${vaccine.vaccine_ID})" style="background-color: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-left: 5px;">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(err => console.error('Error fetching vaccines:', err));
}


function editVaccine(button) {
  const row = button.parentElement.parentElement;
  const cells = row.children;
  for (let i = 1; i < cells.length - 1; i++) {
    cells[i].setAttribute('contenteditable', 'true');
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

async function saveVaccine(button) {
    console.log('Save button clicked'); // Log to check if function is triggered
    const row = button.parentElement.parentElement;
    const updatedData = {
      vaccine_ID: row.children[0].textContent,
      vaccine_name: row.children[1].textContent,
      opening_stock: row.children[2].textContent,
      purchased: row.children[3].textContent,
      total_stock: row.children[4].textContent,
      dispensed: row.children[5].textContent,
      closing_stock: row.children[6].textContent,
      order_date: row.children[7].textContent,
      expiration_date: row.children[8].textContent
    };
  
    try {
      const response = await fetch(`/vaccines/${updatedData.vaccine_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (response.ok) {
        alert('Vaccine record successfully saved');
        for (let i = 1; i < row.children.length - 1; i++) {
          row.children[i].setAttribute('contenteditable', 'false');
        }
        fetchVaccines();
      } else {
        const errorData = await response.json();
        alert(`Failed to save vaccine: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error saving vaccine data:', error);
      alert('An error occurred. Please try again later.');
    }
  }
  

function removeVaccine(id) {
  if (confirm('Are you sure you want to remove this vaccine?')) {
    fetch(`/vaccines/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => fetchVaccines())
      .catch(err => console.error('Error deleting vaccine:', err));
  }
}

function searchVaccines() {
  const searchTerm = document.getElementById('searchBar').value.toLowerCase();
  const rows = document.querySelectorAll('#vaccineTable tbody tr');
  rows.forEach(row => {
    const vaccineName = row.children[1].textContent.toLowerCase();
    row.style.display = vaccineName.includes(searchTerm) ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadWelcomeMessage();
});