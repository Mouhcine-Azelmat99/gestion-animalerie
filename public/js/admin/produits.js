class Product{
    constructor(id,nom,prix){
        this.id=id;
        this.nom=nom;
        this.prix=prix;
    }
}
window.onload=getData();

const product_form=document.getElementById("produits_form");
const nom_produit=document.getElementById("nom_produit");
const prix_produit=document.getElementById("prix_produit");
const table_body =document.getElementById("produits_table");
const addProduct_btn=document.getElementById("addProduct_btn");
const updateProduct_btn=document.getElementById("updateProduct_btn");
const product_id = document.getElementById("product_id");
const error_alert= document.getElementById("error_alert_produits");


product_form.addEventListener("submit",(e)=>{
    e.preventDefault();
})

function addProductInTable(e){
    const row=document.createElement('tr');
    const colId=document.createElement('td');
    const colNom=document.createElement('td');
    const colPrix=document.createElement('td');
    const colAction=document.createElement('td');

    colId.textContent=e.id;
    colNom.textContent=e.nom;
    colPrix.textContent=e.prix;

    const editBtn=document.createElement("button");
    editBtn.setAttribute("class", "btn btn-primary");
    editBtn.setAttribute("onclick",`editProduct("${e.id}")`);
    editBtn.textContent="Modifier";

    const deleteBtn=document.createElement("button");
    deleteBtn.setAttribute("class", "btn btn-danger mx-4");
    deleteBtn.setAttribute("onclick",`deleteProduct("${e.id}")`);
    deleteBtn.textContent="Supprimer";
    colAction.appendChild(editBtn);
    colAction.appendChild(deleteBtn);


    row.appendChild(colId);
    row.appendChild(colNom);
    row.appendChild(colPrix);
    row.appendChild(colAction);

    table_body.appendChild(row);
  }

function resetColumns(){
    product_id.value=null;
    nom_produit.value=null;
    prix_produit.value=null;

}


function resetTable(){
    while (table_body.firstChild) {
        table_body.removeChild(table_body.firstChild);
    }
}


function editProduct(id){
    addProduct_btn.style.display ='none';
    updateProduct_btn.style.display ='block';
    product_id.value=id;
    var xhr = new XMLHttpRequest();
    var urlget = "http://127.0.0.1:8000/api/produits/"+id;

    xhr.open("GET", urlget, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        nom_produit.value=response.nom;
        prix_produit.value=response.prix;
    }
    };

    xhr.send();
}

// CRUD Operations

function addProduct(){
    error_alert.textContent='';
    error_alert.style.display="none";
    if(!isValid()){
        return;
    }
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/produits";
    var payload = {
        nom: nom_produit.value,
        prix: prix_produit.value
    };

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        resetColumns();
        getData();
    }
    };
    xhr.send(JSON.stringify(payload));
}


function getData(){

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

function deleteProduct(id){
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/produits/"+id;

    xhr.open("DELETE", url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Delete request successful");
        getData();
      }
    };

    xhr.send();
}

function updateProduct(){
    console.log("updateProduct");
    var id =product_id.value;
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/produits/"+id;
    var payload = {
        nom: nom_produit.value,
        prix: prix_produit.value
    };
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        addProduct_btn.style.display ='block';
        updateProduct_btn.style.display ='none';
        resetColumns();
        getData();
    }
    };
    xhr.send(JSON.stringify(payload));

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

// Validation
function isValid(){
    if(nom_produit.value==''){
        error_alert.textContent+="Nom is empty.";
    }
    if(prix_produit.value==''){
        error_alert.textContent+=" - Prix  is empty.";
    }
    if(error_alert.textContent==''){
        return true ;
    }
    error_alert.style.display='block';
    return false ;
}
