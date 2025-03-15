document.addEventListener('DOMContentLoaded', () => {
    fetchStockOut();
    document.getElementById('stockOutForm').addEventListener('submit', addStockOut);
  });
  
  async function fetchStockOut() {
    try {
      const response = await fetch('/stock_out');
      const data = await response.json();
      const tableBody = document.querySelector('#stockOutTable tbody');
      tableBody.innerHTML = '';
  
      data.forEach(stock => {
        const formattedDate = stock.stockout_date.split('T')[0];
        const row = `
          <tr style="background-color: white;">
            <td>${stock.stockout_ID}</td>
            <td>${stock.vaccine_name}</td>
            <td>${stock.quantity}</td>
            <td>${stock.assistant_name}</td>
            <td>${formattedDate}</td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
      });
    } catch (error) {
      console.error('Error fetching stock-out data:', error);
    }
  }

  function searchStock() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const rows = document.querySelectorAll('#stockOutTable tbody tr');
    rows.forEach(row => {
      const patientName = row.children[1].textContent.toLowerCase();
      row.style.display = patientName.includes(searchTerm) ? '' : 'none';
    });
  }

  async function addStockOut(event) {
    event.preventDefault();
    const vaccine_id = document.getElementById('vaccineId').value;
    const assistant_id = document.getElementById('assistantId').value;
    const quantity = document.getElementById('quantity').value;
    const stock_out_date = document.getElementById('stockOutDate').value;
  
    const stockData = { vaccine_id, assistant_id, quantity, stock_out_date };
  
    try {
      const response = await fetch('/stock_out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockData)
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        fetchStockOut();
        document.getElementById('stockOutForm').reset();
      } else {
        alert('Failed to add stock-out record');
      }
    } catch (error) {
      console.error('Error adding stock-out record:', error);
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