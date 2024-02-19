import express from "express";
import cors from "cors";
import { executeQuery} from "./Database.js";

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors());

let port = process.env.PORT || 3000;

app.get("/produtos", (req, res) => {
    executeQuery("SELECT * FROM PRODUTO",[],(err, result) => {
        if(err){        
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});

app.get("/produtos/:id", (req, res) => {
    executeQuery("SELECT * FROM PRODUTO WHERE ID=?",[req.params.id],(err, result) => {
        if(err){        
            return res.status(500).json(err);
        } else {
            return res.status(200).json(result);
        }
    });
});

app.delete("/produtos/:id", (req, res) => {
    executeQuery("DELETE FROM PRODUTO WHERE ID=?",[req.params.id],(err, result) => {
        if(err){        
            return res.status(500).json(err);
        } else {
            return res.status(200).send("OK");
        }
    });
});

app.post("/produtos", (req, res) => {
    console.log("banco de dados 1");
  let sql = "INSERT INTO PRODUTO(DESCRICAO,VALOR,DT_VALIDADE) VALUES(?,?,?)";
  if (!req.body.id){
    executeQuery(sql,[req.body.descricao, req.body.valor, req.body.dt_validade], function(err, result){
        if(err){
            console.log(err);
            return res.status(500).json(err); 
        } else {

            return res.status(201).send("ok")//json(result);  
        }
    });  
 } else {
    sql = "UPDATE PRODUTO SET DESCRICAO = ?, VALOR = ?, IMAGEM = ? WHERE ID = ?";
    executeQuery(sql,[req.body.descricao, req.body.valor, req.body.imagem,req.body.id], function(err, result){
        if(err){
            console.log(err);
            return res.status(500).json(err); 
        } else {

            return res.status(201).send("ok")//json(result);  
        }
    });    
 } 
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});
