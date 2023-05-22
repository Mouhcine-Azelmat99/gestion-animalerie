class Reservation{
    constructor(id,type,info,prix,etat,username){
        this.id=id;
        this.type=type;
        this.info=info;
        this.username=username;
        this.prix=prix;
        this.etat=etat;
    }
}
window.onload=getData();
const table_body =document.getElementById("table_reservations");
const error_alert= document.getElementById("error_alert_produits");


function addReservationInTable(e){
    const row=document.createElement('tr');
    const colId=document.createElement('td');
    const colType=document.createElement('td');
    const colUser=document.createElement('td');
    const colInfo=document.createElement('td');
    const colPrix=document.createElement('td');
    const colEtat=document.createElement('td');
    const colAction=document.createElement('td');

    colId.textContent=e.id;
    colType.textContent=e.type;
    colUser.textContent=e.username;
    colPrix.textContent=e.prix;
    colInfo.textContent=e.info;
    colEtat.textContent=e.etat;


    const deleteBtn=document.createElement("button");
    deleteBtn.setAttribute("class", "btn btn-danger mx-4");
    deleteBtn.setAttribute("onclick",`confirmeReservation("${e.id}",${e.prix})`);
    deleteBtn.textContent="Confirmer";
    if(e.etat=="attente"){
        colAction.appendChild(deleteBtn);
    }else{
        colAction.textContent=" -- ";
    }


    row.appendChild(colId);
    row.appendChild(colType);
    row.appendChild(colInfo);
    row.appendChild(colPrix);
    row.appendChild(colUser);
    row.appendChild(colEtat);
    row.appendChild(colAction);

    table_body.appendChild(row);
  }




function resetTable(){
    while (table_body.firstChild) {
        table_body.removeChild(table_body.firstChild);
    }
}

// CRUD Operations
function confirmeReservation(id,mt){
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/reservations/"+id;
    var payload = {
        etat:"cofirmer",
        montant : mt
    };
    console.log(payload);
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        alert("La reservation est confirmer ");
        resetTable();
        getData();
    }
    };
    xhr.send(JSON.stringify(payload));

}


function getData(){

    console.log("loading data...");
    var xhr = new XMLHttpRequest();
    var urlget = "http://127.0.0.1:8000/api/reservations";

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
            var p = new Reservation(resProduit[i].id, resProduit[i].type,info,resProduit[i].prix,resProduit[i].etat,username);
            addReservationInTable(p);
        }
        for (var i = 0; i < resAnimal.length; i++) {
            var info = resAnimal[i].espece+" - "+resAnimal[i].race;
            var username = resAnimal[i].user_nom + " " + resAnimal[i].prenome;
            var p = new Reservation(resAnimal[i].id, resAnimal[i].type,info,resAnimal[i].prix,resAnimal[i].etat,username);
            addReservationInTable(p);
        }
    }
    };

    xhr.send();
  }

function deleteVente(id){
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/ventes/"+id;

    xhr.open("DELETE", url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Delete request successful");
        getData();
      }
    };

    xhr.send();
}



// Search
function searchReservation() {
    console.log("searching...");
    const searchQuery = document.getElementById("searchReservation_input").value.toLowerCase();
    const reservations = table_body.getElementsByTagName("tr");

    for (let i = 0; i < reservations.length; i++) {
      const elem = reservations[i];
      const elem_type = elem.getElementsByTagName("td")[1].textContent.toLowerCase();
      const elem_info = elem.getElementsByTagName("td")[2].textContent.toLowerCase();
      const elem_user = elem.getElementsByTagName("td")[4].textContent.toLowerCase();

      if (elem_type.includes(searchQuery) || elem_info.includes(searchQuery) || elem_user.includes(searchQuery)) {
        elem.style.display = "";
      } else {
        elem.style.display = "none";
      }
    }
  }
