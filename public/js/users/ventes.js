class Vente{
    constructor(id,type,username,info,montant,date){
        this.id=id;
        this.type=type;
        this.info=info;
        this.username=username;
        this.montant=montant;
        this.date=date;
    }
}
window.onload=getData();

const table_body =document.getElementById("ventes_table");
const error_alert= document.getElementById("error_alert_produits");


function addVenteInTable(e){
    const row=document.createElement('tr');
    const colId=document.createElement('td');
    const colType=document.createElement('td');
    const colUser=document.createElement('td');
    const colInfo=document.createElement('td');
    const colMontant=document.createElement('td');
    const colDate=document.createElement('td');
    const colAction=document.createElement('td');

    colId.textContent=e.id;
    colType.textContent=e.type;
    colUser.textContent=e.username;
    colMontant.textContent=e.montant;
    colInfo.textContent=e.info;
    colDate.textContent=e.date;

    row.appendChild(colId);
    row.appendChild(colType);
    row.appendChild(colUser);
    row.appendChild(colInfo);
    row.appendChild(colMontant);
    row.appendChild(colDate);

    table_body.appendChild(row);
  }




function resetTable(){
    while (table_body.firstChild) {
        table_body.removeChild(table_body.firstChild);
    }
}

// CRUD Operations



function getData(){

    console.log("loading data...");
    var xhr = new XMLHttpRequest();
    var urlget = "http://127.0.0.1:8000/api/ventes";

    xhr.open("GET", urlget, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var responses = JSON.parse(xhr.responseText);
        resetTable();
        resProduit=responses[0];
        resAnimal=responses[1];

        for (var i = 0; i < resProduit.length; i++) {
            var info = resProduit[i].produit_nom;
            var  username= resProduit[i].user_nom + " " + resProduit[i].prenome;
            var p = new Vente(resProduit[i].id, resProduit[i].type,username,info,resProduit[i].montant,resProduit[i].created_at);
            addVenteInTable(p);
        }
        for (var i = 0; i < resAnimal.length; i++) {
            var info = resAnimal[i].espece+" - "+resAnimal[i].race;
            var username = resAnimal[i].user_nom + " " + resAnimal[i].prenome;
            var p = new Vente(resAnimal[i].id, resAnimal[i].type,username,info,resAnimal[i].montant,resAnimal[i].created_at);
            console.log("resAnimal");
            addVenteInTable(p);
        }
    }
    };

    xhr.send();
  }


// Search
function searchVente() {
    console.log("searching...");
    const searchQuery = document.getElementById("searchVente_input").value.toLowerCase();
    const ventes = table_body.getElementsByTagName("tr");

    for (let i = 0; i < ventes.length; i++) {
      const elem = ventes[i];
      const elem_type = elem.getElementsByTagName("td")[1].textContent.toLowerCase();
      const elem_user = elem.getElementsByTagName("td")[2].textContent.toLowerCase();
      const elem_info = elem.getElementsByTagName("td")[3].textContent.toLowerCase();

      if (elem_type.includes(searchQuery) || elem_info.includes(searchQuery) || elem_user==searchQuery) {
        elem.style.display = "";
      } else {
        elem.style.display = "none";
      }
    }
  }
