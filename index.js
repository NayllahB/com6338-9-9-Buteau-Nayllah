// Your code here
const weatherSection = document.getElementById('weather')
const form = document.querySelector('form')
const inputEl = document.getElementById('weather-search')

form.onsubmit = async e => {
    e.preventDefault()
    const userQuery = form.search.value.trim()
    const fetchURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=e1a82f604d41c08378f9111b9b223d94&q=${userQuery}`
    if(!userQuery) return
    form.search.value = ""
    try{
        const res = await fetch(fetchURL)
        if (res.status != 200) throw new Error('Location not found')
        const weatherData = await res.json()
        viewLocation(weatherData)
    } catch(err) {
        weatherSection.innerHTML = `<h2>${err.message}</h2>`
    }
}

const viewLocation = ({
    name,
    coord:{
        lat,
        lon
    },
    weather,
    main:{
        temp,
        feels_like,
    },
    dt,
    sys:{country}
}) => {
    //destructured weather array
    const[{description, icon}] = weather
    //weather data added to html
    weatherSection.innerHTML =`
    <h2>${name.toUpperCase()}, ${country}</h2>
    <a href=https://www.google.com/maps/search/?api=1&query=${lat},${lon}>Click to view map</a>
    <img src=https://openweathermap.org/img/wn/${icon}@2x.png alt=${description}>
    <p>${description}</p>
    <p>Current: ${temp}\u00B0F</p>
    <p>Feels like: ${feels_like}\u00B0F</p>
    <p>Last Updated: ${new Date(dt*1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})}</p>`
}