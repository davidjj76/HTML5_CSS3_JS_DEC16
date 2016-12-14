function getLocation(){
    if(navigator.geolocation) {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(showPosition, errorHandler, options);
    } else {
        alert("Geolocalizacion no soportada");
    }
}

function showPosition(position) {

    // Con AJAX
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Peticion al API de Google 
    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=true";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log("Respuesta servidor", JSON.parse(xhr.responseText));
        }
    };
    xhr.send();

    // Método Google Maps
    // var myLatLng = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    // };

    // var mapProp = {
    //     center: myLatLng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    // var marker = new google.maps.Marker({
    //     position: myLatLng,
    //     map: map,
    //     title: 'Aqui estamos'
    // });
    
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

function fakePost(position) {

    // Con AJAX
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Post al API de jsonplaceholder 
    var url = "https://jsonplaceholder.typicode.com/posts";
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log(xhr);
            console.log("Respuesta servidor", JSON.parse(xhr.responseText));
        }
    };
    // En el parametro se envían los datos del POST
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send("mypost=25&myage=40&color=red");
}

fakePost();
// getLocation();
