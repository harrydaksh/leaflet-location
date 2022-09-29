
var mymap = L.map('my_map').setView([12.9063861, 77.6108759], 6);
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';


const tileLayers = L.tileLayer(tileUrl,{attribution})
tileLayers.addTo(mymap)



function genrateList(){
    let ul= document.querySelector(".list");

storeList.forEach((shop)=>{
    let li = document.createElement("li");
    let div= document.createElement("div")
    let a= document.createElement("a")
    let p= document.createElement("p")
    div.classList.add('shop-item');


a.addEventListener('click',()=>{
    flyToLocation(shop)
})

    a.innerHTML=shop.properties.name;
    a.href='#';
    p.innerHTML=shop.properties.address;
    div.appendChild(a);
    div.appendChild(p);
    li.appendChild(div)
    ul.appendChild(li)

})


}
genrateList();


function makePopupContent(shop){
    return `
    <div>
    <h4>${shop.properties.name}</h4>
    <p>${shop.properties.address}</p>
<div class="phone-number">
<a href="tel:${shop.properties.phone}">${shop.properties.phone}</a>
</div>
    </div>
    `
}

function onEachFeature(feature,layer) {
    layer.bindPopup(makePopupContent(feature),{closeButton:false,offset:L.point(0,-8)})
}

const myIcon = L.icon({
    iconUrl:'marker.png',
    iconSize:[30,40],
    // classList:"blinking"
})

const shopLayer = L.geoJSON(storeList,{
    onEachFeature: onEachFeature,
    pointToLayer: function(Feature,latlng){
       
        return L.marker(latlng,{icon: myIcon})

    }
})
shopLayer.addTo(mymap)


function flyToLocation(store){
let lat=store.geometry.coordinates[1]
let lng=store.geometry.coordinates[0]
mymap.flyTo([lat,lng],14,{
    // animation:false
    duration:3
})
setTimeout(()=>{
    L.popup({closeButton:false,offset:L.point(0,-8)})
    .setLatLng([lat,lng])
    .setContent(makePopupContent(store))
    .openOn(mymap)
},3000
)}



//locate my location

mymap.locate({setView: true, maxZoom: 16});
function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(mymap)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(mymap);
}

mymap.on('locationfound', onLocationFound);



// mymap.createPane('labels');
// mymap.getPane('labels').style.zIndex = 650;
// mymap.getPane('labels').style.pointerEvents = 'none';
// var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//         attribution: '©OpenStreetMap, ©CartoDB'
// }).addTo(mymap);

// var positronLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//         attribution: '©OpenStreetMap, ©CartoDB',
//         pane: 'labels'
// }).addTo(mymap);

// var geojson = L.geoJson(GeoJsonData, geoJsonOptions).addTo(mymap);

// geojson.eachLayer(function (layer) {
//     layer.bindPopup(layer.feature.properties.name);
// });

// mymap.fitBounds(geojson.getBounds("vhvjb"));