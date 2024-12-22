
const searchInput = document.getElementById("searchinput");
const searchBtn = document.getElementById("searchBtn");
const rowData = document.getElementById("rowData");
const myK="60473426f632422eb14151310242012";
async function callApi(value) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cfb39f2407924993aa2221145241712&q=${value}&days=3`);
        let data = await response.json();
        display(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        // alert("hgfd")
    }
}
searchInput.addEventListener("input" , (e)=>{
console.log(e.target.value);

if (e.target.value.length < 3) return;
callApi(e.target.value)
    
});

searchBtn.addEventListener("click" , function () {
    callApi(searchInput.value);
    
} );

function display(data) {
    let location = data.location.name;
    let array = data.forecast.forecastday;
    let carton = "";

    for (let i = 0; i < array.length; i++) {
        let x = getDay(array[i].date);
        carton += `
        <div class="col-md-4 forecast p-0">
            <div class="forecast-header p-3 rounded-3 bg-black mx-2 d-flex align-items-center justify-content-between">
                <p class="day">${x.day}</p>
                <p>${i < 1 ? x.month : ""}</p>
            </div>
        
            <div class="forecast-body mx-2 p-3 h-100 bg-dark">
                <p class="location">${i < 1 ? location : ""}</p>
                <div class="degree">
                    <div class="num me-4 d-inline-block">
                        ${i < 1 ? data.current.temp_c : array[i].day.avgtemp_c}
                        <sub>°C</sub>
                    </div>
                    <div class="forecast-icon d-inline-block mb-2">
                        <img src="${i < 1 ? data.current.condition.icon : array[i].day.condition.icon}
                        "width="90" alt="">
                    </div>
                </div>
                <p class="custom mb-5">
                ${i < 1 ? data.current.condition.text : array[i].day.condition.text}
                </p>
              <div>
              ${i<1? `
                  <span class="me-2">
                    <img src="./image/icon-umberella.png" alt="">
                   ${array[i].day.avghumidity} %
                </span>
                <span class="me-2">
                    <img src="./image/icon-wind.png" alt="">
                    ${array[i].day.maxwind_kph} Kph
                </span>
                <span class="me-2">
                    <img src="./image/icon-compass.png" alt="">
                    ${data.current.wind_dir}
                </span>
                `:""}
              </div>

            </div>
        </div>
        `;
    }
    rowData.innerHTML = carton;
}

function getDay(x) {
    let date = new Date(x);
    let day = date.toLocaleString("en-US", { weekday: "long" }); 
    let month = date.toLocaleString("en-US", { month: "long" });
    return { day, month };
}

navigator.geolocation.getCurrentPosition((data)=>{
    let x =data.coords.latitude;
    let y = data.coords.longitude;
    callApi(`${x},${y}`);
}, 
(err)=>{
    callApi("cairo")
})





