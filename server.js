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

// GET all scooters:
app.get("/scooters", (req, res) => {
    connection.query("SELECT * FROM scooters", (err, rows, fields) => {
        if (err) throw err;
        res.status(200).send(rows);
    });
});

// GET one scooter:
app.get("/scooters/:id", (req, res) => {
    connection.query(
        "SELECT * FROM scooters WHERE id = ?",
        req.params.id,
        (err, rows, fields) => {
            if (err) throw err;
            res.status(200).send(rows);
        }
    );
});

// DELETE scooter:
app.delete("/scooters/:id", (req, res) => {
    connection.query(
        "DELETE FROM scooters WHERE id = ? ",
        req.params.id,
        (err, rows, field) => {
            if (err) throw err;
            console.log("deleted: ", rows);
            res.status(204).send();
        }
    );
});

// CREATE scooter:
app.post("/scooters", (req, res) => {
    connection.query(
        "INSERT INTO scooters (`registration_code`, `is_busy`) VALUES (?, ?)",
        [
            req.body.registration_code,
            req.body.is_busy,
        ],
        (err, rows, field) => {
            if (err) throw err;
            console.log("created: ", { id: rows.insertId, ...req.body });
            res.status(201).send({ id: rows.insertId, ...req.body });
        }
    );
});

// UPDATE scooter:
app.put("/scooters/:id", (req, res) => {
    connection.query(
        "UPDATE scooters SET registration_code = ?, is_busy = ?, last_use_time = ?, total_ride_kilometers = ? WHERE id = ?",
        [
            req.body.registration_code,
            req.body.is_busy,
            req.body.last_use_time,
            req.body.total_ride_kilometers,
            req.params.id,
        ],
        (err, rows, field) => {
            if (err) throw err;
            console.log("updated: ", { rows });
            res.status(201).send({id: parseInt(req.params.id), ...req.body});
        }
    ); 
});

app.listen(port, () =>
    console.log(`Port: ${port}!`)
);


