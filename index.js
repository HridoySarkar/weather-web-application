document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar');

    const locationElement = document.querySelector('#location');
    const dateElement = document.querySelector('#today_date');
    const precipitationElement = document.querySelector('#precipitation');
    const humidityElement = document.querySelector('#humidity');
    const windElement = document.querySelector('#wind');
    const weekElement = document.querySelector('#weeks');
    const tempElement = document.querySelector('#temp');

    searchButton.addEventListener('click', () => {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        } else {
            alert('Please enter a city name.');
        }
    });

    async function fetchWeatherData(city) {
        const apiKey = '13074f578bbd41ebae6152023242909'; 
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            console.log('Weather Data:', data);
            updateWeatherData(data);
        } catch (error) {
            alert(error.message);
        }
    }

    function updateWeatherData(data) {
        const { current, location } = data;
        console.log(data);
        

        
        const date = new Date();
        dateElement.textContent = date.toLocaleDateString();
        weekElement.textContent = date.toLocaleDateString('en-US', { weekday: 'long' });

        
        locationElement.textContent = `${location.name}, ${location.country}`;

        tempElement.textContent = `${current.temp_c}`;

        
        precipitationElement.textContent = `${current.precip_mm || 0}`; 
        humidityElement.textContent = `${current.humidity} %`;
        windElement.textContent = `${current.wind_kph} km/h`;
    }

    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});
