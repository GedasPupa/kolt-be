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
        if (err) {
            console.log(err.message);
            return res.status(500).send({
                error_code: err.code,
                error_message: err.sqlMessage,
            });
        };
        try {
            console.log('Nice! You got all', rows.length, 'scooters!');
        } catch (err) {
            console.log(err.message);
        };
        res.status(200).send(rows);
    });
});

// GET one scooter:
app.get("/scooters/:id", (req, res) => {
    connection.query(
        "SELECT * FROM scooters WHERE id = ?",
        req.params.id,
        (err, rows, fields) => {
            // console.log({...fields});
            if (err) {
                console.log(err.message);
                return res.status(500).send({
                    error_code: err.code,
                    error_message: err.sqlMessage,
                });
            };
            try {
                console.log('You got scooter with id: ', rows[0].id);
            } catch (err) {
                console.log(`Scooter with id ${req.params.id} not found!`);
            };
            if (rows.length === 0) {
                return res.status(404).send({
                    id: +req.params.id,
                    error_message: 'Record not found'
                });
            }
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
            if (err) {
                console.log(err.message);
                return res.status(500).send({
                    error_code: err.code,
                    error_message: err.sqlMessage,
                });
            };
            console.log("Deleted rows:", rows.affectedRows);
            if (!rows.affectedRows) return res.status(404).send({
                id: +req.params.id,
                error_message: 'Record not found'
            });
            res.status(204).send({
                id: +req.params.id,
                message: `Record with id ${req.params.id} deleted`
            });
        }
    );
});

// CREATE scooter:
app.post("/scooters", (req, res) => {
    connection.query(
        "INSERT INTO scooters (registration_code, is_busy, last_use_time, total_ride_kilometers) VALUES (?, ?, ?, ?)",
        [
            req.body.registration_code,
            req.body.is_busy,
            req.body.last_use_time,
            req.body.total_ride_kilometers,
        ],
        (err, rows, field) => {
            if (err) {
                console.log(err.message);
                return res.status(500).send({
                    error_code: err.code,
                    error_message: err.sqlMessage,
                });
            };
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
            if (err) {
                console.log(err.message);n
                return res.status(500).send({
                    error_code: err.code,
                    error_message: err.sqlMessage,
                });
            };
            console.log("Updated rows:", rows === undefined ? 0 : rows.affectedRows);
            if (!rows.affectedRows) {
                console.log(`Record with id ${req.params.id} not found!`);
                return res.status(404).send({
                    id: +req.params.id,
                    error_message: 'Record not found'
                });
            }
            res.status(201).send({id: +req.params.id, ...req.body});
        }
    ); 
});

// TOTAL scooters:
app.get("/total", (req, res) => {
    connection.query("SELECT count(*) as total_scooters FROM scooters", (err, rows, fields) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send({
                error_code: err.code,
                error_message: err.sqlMessage,
            });
        };
        console.log("Total scooters: ", rows[0].total_scooters);
        res.status(200).send({ total_scooters: rows[0].total_scooters });
    });
});

// TOTAL kilometers:
app.get("/kilometers", (req, res) => {
    connection.query("SELECT sum(total_ride_kilometers) as total_kilometers FROM scooters", (err, rows, fields) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send({
                error_code: err.code,
                error_message: err.sqlMessage,
            });
        };
        console.log("Total kilometers: ", rows[0].total_kilometers);
        res.status(200).send({ total_kilometers: rows[0].total_kilometers });
    });
});

app.listen(port, () =>
    console.log(`Port: ${port}!`)
);
