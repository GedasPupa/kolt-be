import express from "express";
import mysql from "mysql";
import cors from 'cors';

const port = 3000;
const app = express();

const corsOptions = {
    origin: "http://localhost:4200"
};

const dbConfig = {
    host: "localhost",
    user: "gedaspupa",
    password: "gedaspupa123",
    database: "kolt",
    multipleStatements: false,

};

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
});

connection.connect((error) => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

app.use(cors(corsOptions));
app.use(express.json());

app.get("/test-conn", (req, res) => {
    connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
        if (err) throw err;
        console.log("The solution is: ", rows[0].solution);
        res.status(200).send({ solution: rows[0].solution });
    });
});


app.get("/scooters", (req, res) => {
    connection.query("SELECT * FROM scooters", (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send(rows);
    });
});


app.listen(port, () =>
    console.log(`Port: ${port}!`)
);


