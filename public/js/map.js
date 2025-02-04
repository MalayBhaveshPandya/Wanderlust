mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', 
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates , // Use the coordinates directly here
    zoom: 8
});


const marker1 = new mapboxgl.Marker({color:'red'})
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided fter booking</p>`))
        .addTo(map);
