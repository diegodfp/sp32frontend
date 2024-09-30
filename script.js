
const apiUrl = 'https://apisp32.onrender.com/api/sensor-data';

async function fetchData() {
  try {
    const response = await fetch( apiUrl);
    
    if (!response.ok) {
      throw new Error('Error al obtener los datos: ' + response.statusText);
    }

    const data = await response.json();
    
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = data.map(item => `
      <div>
        <p>ID: ${item.id}</p>
        <p>Temperatura: ${item.temperature}°C</p>
        <p>Humedad: ${item.humidity}%</p>
        <p>Fecha y hora: ${new Date(item.timestamp).toLocaleString()}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('data-container').textContent = 'Error al cargar los datos.';
  }
}

window.onload = fetchData;
