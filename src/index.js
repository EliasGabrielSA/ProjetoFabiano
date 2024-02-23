// Importing required modules
import express from "express";
import cors from "cors";
import path from "path";
import { executeQuery } from "./Database.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Setting up middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors());

let port = process.env.PORT || 3000;

// GET route to serve CSS files
app.get("/css/:filename", (req, res) => {
    const cssFilePath = path.join(__dirname, "css", req.params.filename);
    res.sendFile(cssFilePath);
});

// GET route to serve JS files
app.get("/js/:filename", (req, res) => {
    const jsFilePath = path.join(__dirname, "js", req.params.filename);
    res.sendFile(jsFilePath);
});

// GET route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// GET route to fetch all products
app.get("/produtos", (req, res) => {
    executeQuery("SELECT * FROM PRODUTO", [], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});

// GET route to fetch a specific product by ID
app.get("/produtos/:id", (req, res) => {
    executeQuery("SELECT * FROM PRODUTO WHERE ID=?", [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});

// DELETE route to delete a product by ID
app.delete("/produtos/:id", (req, res) => {
    executeQuery("DELETE FROM PRODUTO WHERE ID=?", [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).send("OK");
        }
    });
});

// POST route to create or update a product
app.post("/produtos", (req, res) => {
    console.log("banco de dados 1");
    let sql = "INSERT INTO PRODUTO(DESCRICAO,DT_VALIDADE) VALUES(?,?)";
    if (!req.body.id) {
        executeQuery(sql, [req.body.descricao, req.body.dt_validade], function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            } else {
                return res.status(201).send("ok");
            }
        });
    } else {
    sql = "UPDATE PRODUTO SET DESCRICAO = ?, DT_VALIDADE = ? WHERE ID = ?";
    executeQuery(sql, [req.body.descricao, req.body.dt_validade, req.body.id], function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        } else {
            return res.status(201).send("ok");
        }
    });
}
});

// Starting the server
app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});
