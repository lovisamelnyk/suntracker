Api:er som används:

- Trafiklabs SL närliggande hållplatser https://www.trafiklab.se/api/sl-narliggande-hallplatser
    nyckel: fec1253454c240848533ca2b70772ccd


- Open weather data https://openweathermap.org/current
    nyckel: cbf2c6a4157261d784a212bf75592d81

Programmet sträcker sig endast i Stockholm eftersom SL inte kör längre än så. 
Om den soliga platsen ligger på en kordinat som ligger utanför stockholm så listas det därför inga hållplatser. 
Vill egentligen skriva ut varningsmeddelandet "Du måsta ta bilen" om detta sker.
Denna uppgift är inte cachad.