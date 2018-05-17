<?php
// Ta emot fråga från JS
// Skicka vidare till externt api
// returnera svaret

//var_dump($_GET);


$SLkey = "fec1253454c240848533ca2b70772ccd";
$SLendpoint = "http://api.sl.se/api2/nearbystops.JSON?key=" . $SLkey . "&originCoordLat=" . $_GET['originCoordLat'] . "&originCoordLong=" . $_GET['originCoordLong'] . "&maxresults=3&radius=1000";

//var_dump(file_get_contents($SLendpoint));

echo file_get_contents($SLendpoint);