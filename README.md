<h3 align="center">Alter.io Full Stack Assignment</h3>

## Features
- Realtime sync
- Ignores user input for 4 seconds,every 4 seconds
- Generates a new Grid every 2 seconds based on user input
- Handles conflicts between inputs from different clients
- Implements data persistance using SQLite3 and Better Sqlite plugin


## How to Run the project

## Frontend

### Uses

Frontend uses Angular 18, you need node v20+.

### To run the frontend, simply

```
cd frontend
```

```
npm i
```

```
npm start
```

### Pages

Frontend has two pages

```
/grid
```

and

```
/payments
```

## Backend

### Uses

Backend uses Express and Nodejs v20, it also uses Sqlite3 and Better SQlite for data storage.

The project uses socket.io for realtime communication which can be found in the

```
feat/real-time-sync-payments
```

branch

### To run the backend, simply

```
cd backend
```

```
npm i
```

```
nodemon
```
