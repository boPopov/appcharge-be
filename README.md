# AppCharge-BE

## Description
This project is written in Nest JS, the Dockerfile is inside the service folder. Additionaly, docker-compose is in the root of the project.<br>
As a storage a database is used.<br>
Currently the database has some items to it and a single user that is provided in the API Section below.<br>

## Run
In order to run the project, you need to have [docker installed](https://docs.docker.com/engine/install/ubuntu/).<br>

Run ```docker-compose up``` in order to start the application.<br>

If you want a new user, go inside the postgres image, open the exec, and run the command:<br>
```psql -h localhost -p 5432 -U postgres -d postgres_app```<br>
The password is in the docker-compose file.<br>
To insert a new user ```INSERT INTO users (username, password, email) VALUES ("YOUR_USERNAME", "YOUR_PASSWORD", "YOUR_EMAIL");```<br>
After a new user is created you can login with this user.<br>

## APIs

### Login
URL: localhost:8080/users/login<br>
Type: POST<br>
Body: {<br>
  "username": "bojanp",<br>
  "password": "Boki281996!"<br>
}<br>

### Add New Offer
URL: localhost:8080/offer/new<br>
Type: POST<br>
Bearer: TOKEN<br>
Body: {<br>
  "gamename": "FroseHeaven",<br>
  "gamedescription": "A scenario based game with many character to explore",<br>
  "available": 250,<br>
  "name": "Best Sale on the market",<br>
  "sku": "22",<br>
  "price": "250",<br>
  "currency": "Euro",<br>
  "products": [<br>
    {<br>
      "amount": 500,<br>
      "sku": "002",<br>
      "name": "blaa"<br>
    },<br>
    {<br>
      "amount": 200,<br>
      "sku": "004",<br>
      "name": "dblaaa"<br>
    }<br>
  ]<br>
}<br>

### Delete Offer
URL: localhost:8080/offer/delete<br>
Type: DELETE<br>
Bearer: TOKEN<br>
Body: {<br>
  "id": "OFFER ID"<br>
}<br>

### Edit Offer
URL: localhost:8080/offer/edit<br>
Type: PUT<br>
Bearer: TOKEN<br>
Body: {<br>
  "id": "3",<br>
  "name": "Sale of the Month!",<br>
  "price": "120"<br>
}<br>

### Get a Speicifc Offer
URL: localhost:8080/offer?offer=4<br>
Type: GET<br>
Bearer: TOKEN<br>

### Get all Offer
URL: localhost:8080/offer<br>
Type: GET<br>
Bearer: TOKEN<br>

### Buy Offer
URL: localhost:8080/order/item<br>
Type: POST<br>
Bearer: TOKEN<br>
Body: {<br>
  "cardnumber": "6546846846516468",<br>
  "cardexpiredate": "09/27",<br>
  "cardowner": "TEST USER",<br>
  "cardcvv": "456",<br>
  "offerid": "5"<br>
}<br>