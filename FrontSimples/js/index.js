const btnListar = document.querySelector("#btnListar");
const lstProdutos = document.querySelector("#lstProdutos");

let listar = async function(){
    let resp = await fetch("http://localhost:3000/produtos");
    let produtos = await resp.json();
    produtos.forEach(prod => {       
        let li = document.createElement("li");
        li.textContent = `${prod.descricao} - ${prod.valor}`;
        lstProdutos.appendChild(li);
    });
};

listar();