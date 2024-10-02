const apiUrl = 'https://apisp32.onrender.com/api/data-sensor/list';
const averagesUrl = 'https://apisp32.onrender.com/api/data-sensor/averages';

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    
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

    fetchAverages();

  } catch (error) {
    console.error('Error:', error);
    document.getElementById('data-container').textContent = 'Error al cargar los datos.';
  }
}

async function fetchAverages() {
  try {
    const response = await fetch(averagesUrl);
    
    if (!response.ok) {
      throw new Error('Error al obtener los promedios: ' + response.statusText);
    }

    const averages = await response.json();
    
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML += `
      <div>
        <h2>Promedios de Hoy</h2>
        <p>Temperatura Promedio: ${averages.averageTemperature}°C</p>
        <p>Humedad Promedio: ${averages.averageHumidity}%</p>
      </div>
    `;
  } catch (error) {
    console.error('Error:', error);
  }
}

window.onload = fetchData;
