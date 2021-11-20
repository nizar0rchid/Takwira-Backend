# Takwira-Backend Server

A backend Server for iOS mini project. API implementation with NodeJs, Express and MongoDb
Used bcyptjs to hash passwords and jsonwebtoken to manage authentification and authorization
Currently supporting ElenaSport Api to fetch all live matches (dev still in progress)

The api uri preceed all API endpoints and the following endpoints are currently available :

* **POST**  /api/login
* **GET**  /api/users    (requires a valid token to show all users)
* **POST** /api/users
* **GET** /api/users/:id
* **PUT** /api/users/:id
* **DELETE** /api/users/:id
-----------------------------
* **GET** /api/stades
* **POST** /api/stades
* **GET** /api/stades/:id
* **PUT** /api/stades/:id
* **DELETE** /api/stades/:id
----------------------------
* **GET**  /api/match (show all matches)
* **POST** /api/match (create new match takes team capacity as a parameter)
* **GET** /api/match/:id (show specific match details)
* **PUT** /api/match/:id (join existing match, takes either teamA or teamB as parameter team = teamA)
* **PATCH** /api/match/:id (cancel join existing match, takes either teamA or teamB as parameter team = teamA)
* **DELETE** /api/match/:id (delete or cancel a whole match)
