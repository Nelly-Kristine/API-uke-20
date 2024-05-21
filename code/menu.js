
/*const myList = document.getElementById('myList');
const myButton = document.getElementById('myButton');

myButton.addEventListener("click", openmenu);

function openmenu() {
    if (myList.style.display != 'block') {
        myList.style.display = 'block';
    } else {
        myList.style.display = 'none';
    }
    console.log('clicked');
}*/

// map settings
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

var map = L.map('map1').setView([39.9159986, -99.1299995], 4.48);
/*let marker = L.marker([41.1471676564501, -73.93664063232752]).addTo(map)
let marker2 = L.marker([40.71479516263315, -73.99504510413881]).addTo(map)
let marker3 = L.marker([34.063573394896316, -118.37661028922777]).addTo(map)
let marker4 = L.marker([45.51946994765605, -122.61596061366485]).addTo(map)*/
let tileURL = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
const tiles = L.tileLayer(tileURL, { attribution })

async function show_me() {
    let place = document.getElementById("searchbar").value;
    api_url = 'https://api.openbrewerydb.org/breweries?by_state=' + place;
    let response = await fetch(api_url);
    let data = await response.json();
    data.forEach(element => {
        console.log(element.latitude);
        console.log(element.longitude);
        if (element.longitude != null && element.latitude != null) {
            let marker = L.marker([element.latitude, element.longitude]).addTo(map);
            marker.bindPopup(`
            <b>${element.name}</b><br>
            ${element.city}<br>
            <a href="${element.website_url}">${element.website_url}</a>`).openPopup();
        }
    });
}
