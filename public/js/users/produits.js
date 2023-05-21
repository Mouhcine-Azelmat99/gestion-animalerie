// import { getUserId } from './animaux.js';


class Product{
    constructor(id,nom,prix){
        this.id=id;
        this.nom=nom;
        this.prix=prix;
    }
}
var userd_ide = "";

window.onload=getData();

const table_body =document.getElementById("produits_table");
const product_id = document.getElementById("product_id");
const error_alert= document.getElementById("error_alert_produits");



function addProductInTable(e){
    const row=document.createElement('tr');
    const colId=document.createElement('td');
    const colNom=document.createElement('td');
    const colPrix=document.createElement('td');
    const colAction=document.createElement('td');

    colId.textContent=e.id;
    colNom.textContent=e.nom;
    colPrix.textContent=e.prix;

    const reserverbtn=document.createElement("button");
    reserverbtn.setAttribute("class", "btn btn-success");
    reserverbtn.setAttribute("onclick",`reserver("${e.id}")`);
    reserverbtn.textContent="Reserver";

    colAction.appendChild(reserverbtn);


    row.appendChild(colId);
    row.appendChild(colNom);
    row.appendChild(colPrix);
    row.appendChild(colAction);

    table_body.appendChild(row);
  }


function resetTable(){
    while (table_body.firstChild) {
        table_body.removeChild(table_body.firstChild);
    }
}


// CRUD Operations
function getUserId(){
    var xhr = new XMLHttpRequest();
    var urlget = "http://127.0.0.1:8000/api/user/id";

    xhr.open("GET", urlget, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        userd_ide = response.user_id;
        console.log("user id from getId: " + userd_ide);
    }
    };
    xhr.send();
}

function reserver(prod_id){
    error_alert.textContent='';
    error_alert.style.display="none";
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/reservations";
    var payload = {
        type: "produit",
        user_id: userd_ide,
        product_id: prod_id,
    };
    console.log(payload);
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        alert(response.message);
    }
    };
    xhr.send(JSON.stringify(payload));
}


function getData(){
    getUserId();
    console.log("loading data...");
    var xhr = new XMLHttpRequest();
    var urlget = "http://127.0.0.1:8000/api/produits";

    xhr.open("GET", urlget, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        resetTable();

        for (var i = 0; i < response.length; i++) {
            var p = new Product(response[i].id, response[i].nom,response[i].prix);
            addProductInTable(p);
        }
    }
    };

    xhr.send();
  }

// Search
function searchProduct() {
    console.log("searching...");
    const searchQuery = document.getElementById("searchProduct_input").value.toLowerCase();
    const produits = table_body.getElementsByTagName("tr");

    for (let i = 0; i < produits.length; i++) {
      const elem = produits[i];
      const elem_nom = elem.getElementsByTagName("td")[1].textContent.toLowerCase();
      const elem_prix = elem.getElementsByTagName("td")[2].textContent.toLowerCase();

      if (elem_nom.includes(searchQuery) || elem_prix==searchQuery) {
        elem.style.display = "";
      } else {
        elem.style.display = "none";
      }
    }
  }

