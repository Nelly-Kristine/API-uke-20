// map settings
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

// Laster kartet zoomet på 4,48 og på USA
var map = L.map('map1').setView([39.9159986, -99.1299995], 4.48);
let tileURL = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
const tiles = L.tileLayer(tileURL, { attribution })

// Funksjonen for å laste opp breweries når man bruker søkefeltet og trykket på søk
// async betyr at denne funksjonen benytter asykrone funksjonskall
async function show_me() {
    // Henter stat fra søkefelt
    let place = document.getElementById("searchbar").value;

    // Link til API funksjonen for å søke opp breweris i ønsket stat.
    api_url = 'https://api.openbrewerydb.org/breweries?by_state=' + place;

    // fetch() kjører API funksjonen. Funskjonen gir et Promise tilbake. Denne bruker vi til å vente på at 
    // funksjonen er ferdig. Får tilbake et Promise
    let response = await fetch(api_url);

    // Her venter vi på at funksjonen skal bli ferdig. Når den er ferdig ber vi om å få resultat i JSON
    let data = await response.json();
    
    // Sletter kartet
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer)
        }
    });

    // Nå har vi fått svarer fra serveren i format av JSON og går igjennom alle breweries og legger på kartet
    data.forEach(element => {
 
        // Først sjekker vi om breweriet har longitude og latitude, ellers så kræsjer det
        if (element.longitude != null && element.latitude != null) {
            // Her lager vi en ny markør på kartet
            let marker = L.marker([element.latitude, element.longitude]).addTo(map);
            // BindPopup funksjonen legger til en liten tekstvindu når brukeren klikker på markøren.
            marker.bindPopup(`
            <h3>Company name: </h3><b>${element.name}</b>
            <h3>City: </h3>${element.city}<br> 
            <h3>Address: </h3>${element.address_1}<br>
            <a href="${element.website_url}">${element.website_url}</a>`).openPopup();
        }
    });
}
