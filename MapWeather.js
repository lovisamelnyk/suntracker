window.addEventListener('load', init);
function init() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
        // navigator.geolocation itne tillgängligt
        console.log("Byt till en annan webbläsare!");
    }
}

function geoError() {
    console.log("Geolocation misslyckades");
}

function geoSuccess(position) {
    console.log(position);
    getWeather(position);
}

function getWeather(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    //sessionStorage.setItem("Longitude", long);
    //sessionStorage.setItem("Latitude", lat);

    var key = "cbf2c6a4157261d784a212bf75592d81";

    // parameterns callback anger namnet på funktionen som SKA ANROPAS av jsonp (som ska wrappa jsondatan)
    var endpoint = " http://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + long + "&cnt=50" + "&APPID=" + key + "&callback=weatherCB&units=metric&lang=sv";
    console.log(endpoint);
    var scriptElem = document.createElement('script');
    scriptElem.type="text/javascript";
    scriptElem.src=endpoint;
    document.body.appendChild(scriptElem);
}

/**
 * JSONP-Callback för Open Weather Map
 * @param jsonText
 *
 * Obs! funktionsnamnen skickas till API:et som parameter &callback.
 */

function weatherCB(jsonText) {

    console.log(jsonText);
    console.log(jsonText.list);
    
    var SkyIsClearPlaces = []; //Skapar en array för soliga platser
    for(var j = 0; j < jsonText.list.length; j++){

        if ( jsonText.list[j].weather[0].description == "klar himmel" || "lätt molnighet"){
            //Pushar endast in de platser med "sky in clear" i arrayen SkyIsClearPlaces. 
            SkyIsClearPlaces.push(jsonText.list[j]);

        }
    
    }

    console.log(SkyIsClearPlaces);

    if (SkyIsClearPlaces.length < 1) {
        var html = "<span> Ingen sol nära dig idag :(</span>"
        document.getElementById("sorry").innerHTML += html;
        console.log("fel");
    } else {
        for (var i = 0; i < 3; i++) {
            var html = "<div class='col-sm-4' style= 'padding:20px;' ><h1>" + SkyIsClearPlaces[i].name 
            + "</h1><span><i class='fas fa-thermometer-three-quarters'></i>" + " " + SkyIsClearPlaces[i].main.temp + " C<sup>o</sup>"  
            +"</span><span><br>" + SkyIsClearPlaces[i].weather[0].description          
            + "</span><br><button type='button' id='" + i + "' class='btn btn-outline-light' onclick='getSLnerbystops" + i + "()'>Busstationer i närheten</button></div>"
            document.getElementById("output").innerHTML += html;
        }
    }

    //Loopar ut kordinaterna för de tre närmaste soliga platserna och sparar i variabler. 
    for (var i = 0; i < 3; i++) {
    
          var endLat = SkyIsClearPlaces[i].coord.lat;
          var endLon = SkyIsClearPlaces[i].coord.lon;

          console.log(endLat);

            sessionStorage.setItem('"Latitude' + i + '"', endLat); //Sparar ner dessa eftersom jag vill använda dem i nästa funktion. Kanske kan nån lära mig ett bättre sätt. 
            sessionStorage.setItem('"Longitude'+ i + '"', endLon);

    
        }
        
    }

// Nu kommer funktionerna som säkert går under all kodkritik eftersom de är super odynamiska och gör exakt samma sak alla tre. 
function getSLnerbystops0 () { 
    document.getElementById("stops").innerHTML = ""; //Tömmer diven innan den ska fyllas på med stationer
    var endLat= sessionStorage.getItem('"Latitude0"'); //Hämtar kordinater för första listade soliga området
    var endLon= sessionStorage.getItem('"Longitude0"');

    //Måste gå via proxy eftersom man inte kan anropa api till främmande servrar. Användaren kan inte se det som står i proxyt.
    var SLendpoint = "proxy.php?originCoordLat=" + endLat + "&originCoordLong=" + endLon + "&maxresults=3&radius=1000"; 
    console.log(SLendpoint);          
    $.getJSON(SLendpoint, function (SLdata) {
        console.log(SLdata);  //Sparar datan från json i variabel. SLdata är ett objekt och inte en array.

        //Loopar ut hållplatsernas namn i en div. 
        $.each(SLdata.LocationList.StopLocation, function (i, item) { 
            var html = "<span>" + SLdata.LocationList.StopLocation[i].name+ "</span><br>"
            document.getElementById("stops").innerHTML += html;    
        });
    });
}


function getSLnerbystops1 () { 
    document.getElementById("stops").innerHTML = ""; //Tömmer diven innan den ska fyllas på med stationer

    //Vill ha ett felmeddelande om den inte har några hållplatser. Får fixa sen. 
    // if(SLdata listan inte finns){
    //     var html = "<span>Det finns infa SL busstationer vid platsen. Du får ta bilen istället.</span><br>"
    //     document.getElementById("stops").innerHTML += html; 
    // }
    var endLat= sessionStorage.getItem('"Latitude1"'); //Hämtar kordinater för andra listade soliga området
    var endLon= sessionStorage.getItem('"Longitude1"');

    //Måste gå via proxy eftersom man inte kan anropa api till främmande servrar. Användaren kan inte se det som står i proxyt.
    var SLendpoint = "proxy.php?originCoordLat=" + endLat + "&originCoordLong=" + endLon + "&maxresults=3&radius=1000"; 
    console.log(SLendpoint);          
    $.getJSON(SLendpoint, function (SLdata) {
        console.log(SLdata);  //Sparar datan från json i variabel. SLdata är ett objekt och inte en array.

        //Loopar ut hållplatsernas namn i en div. 
        $.each(SLdata.LocationList.StopLocation, function (i, item) { 
            var html = "<span>" + SLdata.LocationList.StopLocation[i].name+ "</span><br>"
            document.getElementById("stops").innerHTML += html;    
        });
    });
}

function getSLnerbystops2 () { 
    document.getElementById("stops").innerHTML = ""; //Tömmer diven innan den ska fyllas på med stationer
    var endLat= sessionStorage.getItem('"Latitude2"'); //Hämtar kordinater för tredje listade soliga området
    var endLon= sessionStorage.getItem('"Longitude2"');

    //Måste gå via proxy eftersom man inte kan anropa api till främmande servrar. Användaren kan inte se det som står i proxyt.
    var SLendpoint = "proxy.php?originCoordLat=" + endLat + "&originCoordLong=" + endLon + "&maxresults=3&radius=1000"; 
    console.log(SLendpoint);          
    $.getJSON(SLendpoint, function (SLdata) {
        console.log(SLdata);  //Sparar datan från json i variabel. SLdata är ett objekt och inte en array.

        //Loopar ut hållplatsernas namn i en div. 
        $.each(SLdata.LocationList.StopLocation, function (i, item) { 
            var html = "<span>" + SLdata.LocationList.StopLocation[i].name+ "</span><br>"
            document.getElementById("stops").innerHTML += html;    
        });
    });
}