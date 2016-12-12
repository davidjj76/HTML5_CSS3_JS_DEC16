function getLocation(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorHandler);
    } else {
        alter("Geolocalizacion no soportada");
    }
}

function showPosition(position) {

	console.log(position);

    var myLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    var mapProp = {
        center: myLatLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Aqui estamos'
    });
    
}

function errorHandler(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

getLocation();
