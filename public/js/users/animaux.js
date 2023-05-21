class Animal{
    constructor(id,espece,race,age,prix){
        this.id=id;
        this.espece=espece;
        this.race=race;
        this.age=age;
        this.prix=prix;
    }
}
var userd_ide ="";

window.onload=getData();

const table_body =document.getElementById("animaux_table");
const updateAnimal_btn=document.getElementById("updateAnimal_btn");
const anim_id = document.getElementById("anim_id");
const error_alert= document.getElementById("error_alert");


function addAnimalInTable(e){
    const row=document.createElement('tr');
    const colId=document.createElement('td');
    const colEspece=document.createElement('td');
    const colRace=document.createElement('td');
    const colAge=document.createElement('td');
    const colPrix=document.createElement('td');
    const colAction=document.createElement('td');

    colId.textContent=e.id;
    colEspece.textContent=e.espece;
    colRace.textContent=e.race;
    colAge.textContent=e.age;
    colPrix.textContent=e.prix;

    const reserverbtn=document.createElement("button");
    reserverbtn.setAttribute("class", "btn btn-success");
    reserverbtn.setAttribute("onclick",`reserver("${e.id}")`);
    reserverbtn.textContent="Reserver";

    colAction.appendChild(reserverbtn);

    row.appendChild(colId);
    row.appendChild(colEspece);
    row.appendChild(colRace);
    row.appendChild(colAge);
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


function reserver(anim_id){
    error_alert.textContent='';
    error_alert.style.display="none";
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/reservations";
    var payload = {
        type: "animal",
        user_id: userd_ide,
        animal_id: anim_id,
    };
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
    console.log("user id : "+userd_ide);
    console.log("loading data...");
    var xhr = new XMLHttpRequest();
    var urlget = "http://127.0.0.1:8000/api/animaux";

    xhr.open("GET", urlget, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        resetTable();
        for (var i = 0; i < response.length; i++) {
            var animal = new Animal(response[i].id,response[i].espece, response[i].race, response[i].age,response[i].prix);
            addAnimalInTable(animal);
        }
    }
    };

    xhr.send();
  }



// Search
function searchAnimal() {
    console.log("searching...");
    const searchQuery = document.getElementById("searchAnimal_input").value.toLowerCase();
    const animaux = table_body.getElementsByTagName("tr");

    for (let i = 0; i < animaux.length; i++) {
      const elem = animaux[i];
      const elem_espece = elem.getElementsByTagName("td")[1].textContent.toLowerCase();
      const elem_race = elem.getElementsByTagName("td")[2].textContent.toLowerCase();

      if (elem_espece.includes(searchQuery) || elem_race.includes(searchQuery)) {
        elem.style.display = "";
      } else {
        elem.style.display = "none";
      }
    }
  }




