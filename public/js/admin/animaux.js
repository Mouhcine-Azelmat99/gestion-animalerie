class Animal{
    constructor(id,espece,race,age,prix){
        this.id=id;
        this.espece=espece;
        this.race=race;
        this.age=age;
        this.prix=prix;
    }
}
window.onload=getData();

const animal_form=document.getElementById("animal_form");
const espece_input=document.getElementById("espece");
const race_input=document.getElementById("race");
const age_input=document.getElementById("age");
const prix_input=document.getElementById("prix");
const table_body =document.getElementById("animaux_table");
const addAnimal_btn=document.getElementById("addAnimal_btn");
const updateAnimal_btn=document.getElementById("updateAnimal_btn");
const anim_id = document.getElementById("anim_id");
const error_alert= document.getElementById("error_alert");


animal_form.addEventListener("submit",(e)=>{
        e.preventDefault();

})

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

    const editBtn=document.createElement("button");
    editBtn.setAttribute("class", "btn btn-primary");
    editBtn.setAttribute("onclick",`editAnimal("${e.id}")`);
    editBtn.textContent="Modifier";

    const deleteBtn=document.createElement("button");
    deleteBtn.setAttribute("class", "btn btn-danger mx-4");
    deleteBtn.setAttribute("onclick",`deleteAnimal("${e.id}")`);
    deleteBtn.textContent="Supprimer";
    colAction.appendChild(editBtn);
    colAction.appendChild(deleteBtn);


    row.appendChild(colId);
    row.appendChild(colEspece);
    row.appendChild(colRace);
    row.appendChild(colAge);
    row.appendChild(colPrix);
    row.appendChild(colAction);

    table_body.appendChild(row);
  }

function resetColumns(){
    anim_id.value=null;
    espece_input.value=null;
    race_input.value=null;
    age_input.value=null;
    prix_input.value=null;

}


function resetTable(){
    while (table_body.firstChild) {
        table_body.removeChild(table_body.firstChild);
    }
}


function editAnimal(id){
    addAnimal_btn.style.display ='none';
    updateAnimal_btn.style.display ='block';
    anim_id.value=id;
    var xhr = new XMLHttpRequest();
    var urlget = "http://127.0.0.1:8000/api/animaux/"+id;

    xhr.open("GET", urlget, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        espece_input.value=response.espece;
        race_input.value=response.race;
        age_input.value=response.age;
        prix_input.value=response.prix;
    }
    };

    xhr.send();
}

// CRUD Operations

function addAnimal(){
    error_alert.textContent='';
    error_alert.style.display="none";
    if(!isValid()){
        return;
    }
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/animaux";
    var payload = {
        espece: espece_input.value,
        race: race_input.value,
        age: age_input.value,
        prix: prix_input.value
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

function deleteAnimal(id){
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/animaux/"+id; // Replace with your endpoint URL

    xhr.open("DELETE", url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Delete request successful");
        getData();
      }
    };

    xhr.send();
}

function updateAnimal(){
    console.log("updateAnimal");
    var id =anim_id.value;
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/animaux/update/"+id;
    var payload = {
        espece: espece_input.value,
        race: race_input.value,
        age: age_input.value,
        prix: prix_input.value
    };
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        addAnimal_btn.style.display ='block';
        updateAnimal_btn.style.display ='none';
        resetColumns();
        getData();
    }
    };
    xhr.send(JSON.stringify(payload));

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

// Validation
function isValid(){
    if(espece_input.value==''){
        error_alert.textContent+="Espece is empty.";
    }
    if(race_input.value==''){
        error_alert.textContent+=" - Race is empty.";
    }
    if(age_input.value==''){
        error_alert.textContent+=" - Age is empty.";
    }
    if(prix_input.value==''){
        error_alert.textContent+=" - Prix is empty.";
    }
    if(error_alert.textContent==''){
        return true ;
    }
    error_alert.style.display='block';
    return false ;
}
