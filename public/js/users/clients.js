class User{
    constructor(id,nom,prenome,tel,adress,email){
        this.id=id;
        this.nom=nom;
        this.prenome=prenome;
        this.tel=tel;
        this.adress=adress;
        this.email=email;
    }
}
window.onload=getData();

const users_form=document.getElementById("users_form");
const nom_user=document.getElementById("nom_user");
const prenom_user=document.getElementById("prenom_user");
const tel_user=document.getElementById("tel_user");
const adress_user=document.getElementById("adress_user");
const email_user=document.getElementById("email_user");
const password_user=document.getElementById("password_user");
const table_body =document.getElementById("users_table");
const addUser_btn=document.getElementById("addUser_btn");
const updateUser_btn=document.getElementById("updateUser_btn");
const user_id = document.getElementById("user_id");
const error_alert= document.getElementById("error_alert_clients");


users_form.addEventListener("submit",(e)=>{
    e.preventDefault();
})

function addUserInTable(e){
    const row=document.createElement('tr');
    const colId=document.createElement('td');
    const colNom=document.createElement('td');
    const colPrenom_user=document.createElement('td');
    const colTel_user=document.createElement('td');
    const colAdress_user=document.createElement('td');
    const colEmail_user=document.createElement('td');
    const colAction=document.createElement('td');

    colId.textContent=e.id;
    colNom.textContent=e.nom;
    colPrenom_user.textContent=e.prenome;
    colTel_user.textContent=e.tel;
    colAdress_user.textContent=e.adress;
    colEmail_user.textContent=e.email;

    const editBtn=document.createElement("button");
    editBtn.setAttribute("class", "btn btn-primary");
    editBtn.setAttribute("onclick",`editUser("${e.id}")`);
    editBtn.textContent="Modifier";

    const deleteBtn=document.createElement("button");
    deleteBtn.setAttribute("class", "btn btn-danger mt-2");
    deleteBtn.setAttribute("onclick",`deleteUser("${e.id}")`);
    deleteBtn.textContent="Supprimer";
    colAction.appendChild(editBtn);
    colAction.appendChild(deleteBtn);


    row.appendChild(colId);
    row.appendChild(colNom);
    row.appendChild(colPrenom_user);
    row.appendChild(colTel_user);
    row.appendChild(colAdress_user);
    row.appendChild(colEmail_user);
    row.appendChild(colAction);

    table_body.appendChild(row);
  }

function resetColumns(){
    user_id.value=null;
    nom_user.value=null;
    tel_user.value=null;
    adress_user.value=null;
    email_user.value=null;
    password_user.value=null;
}


function resetTable(){
    while (table_body.firstChild) {
        table_body.removeChild(table_body.firstChild);
    }
}


function editUser(id){
    addUser_btn.style.display ='none';
    updateUser_btn.style.display ='block';
    user_id.value=id;
    var xhr = new XMLHttpRequest();
    var urlget = "http://127.0.0.1:8000/api/users/"+id;

    xhr.open("GET", urlget, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        nom_user.value=response.nom;
        user_id.value=response.nom;
        prenom_user.value=response.prenome;
        tel_user.value=response.tel;
        adress_user.value=response.adress;
        email_user.value=response.email;
        // password_user.value=response.password;
    }
    };

    xhr.send();
}

// CRUD Operations

function addUser(){
    error_alert.textContent='';
    error_alert.style.display="none";
    if(!isValid()){
        return;
    }
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/users";
    var payload = {
        nom : nom_user.value,
        prenome : tel_user.value,
        tel : adress_user.value,
        adress : email_user.value,
        email : password_user.value,
        password : password_user.value,
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
    var urlget = "http://127.0.0.1:8000/api/users";

    xhr.open("GET", urlget, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        resetTable();
        for (var i = 0; i < response.length; i++) {
            var u = new User(response[i].id, response[i].nom,response[i].prenome,response[i].tel,response[i].adress,response[i].email);
            addUserInTable(u);
        }
    }
    };

    xhr.send();
  }

function deleteUser(id){
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/users/"+id;

    xhr.open("DELETE", url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Delete request successful");
        getData();
      }
    };

    xhr.send();
}

function updateUser(){
    console.log("updateUser");
    var id =user_id.value;
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/api/users/"+id;
    var payload = {
        nom : nom_user.value,
        prenome : tel_user.value,
        tel : adress_user.value,
        adress : email_user.value,
        email : password_user.value,
        password : password_user.value,
    };
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        addUser_btn.style.display ='block';
        updateUser_btn.style.display ='none';
        resetColumns();
        getData();
    }
    };
    xhr.send(JSON.stringify(payload));

}

// Search
function searchUser() {
    console.log("searching...");
    const searchQuery = document.getElementById("searchUser_input").value.toLowerCase();
    const users = table_body.getElementsByTagName("tr");

    for (let i = 0; i < users.length; i++) {
      const elem = users[i];
      const elem_nom = elem.getElementsByTagName("td")[1].textContent.toLowerCase();
      const elem_prenome = elem.getElementsByTagName("td")[2].textContent.toLowerCase();
      const elem_email = elem.getElementsByTagName("td")[5].textContent.toLowerCase();

      if (elem_nom.includes(searchQuery) || elem_prenome.includes(searchQuery) || elem_email.includes(searchQuery)) {
        elem.style.display = "";
      } else {
        elem.style.display = "none";
      }
    }
  }

// Validation
function isValid(){
    if(nom_user.value==''){
        error_alert.textContent+="Nom is empty.";
    }
    if(prenom_user.value==''){
        error_alert.textContent+=" - Prix  is empty.";
    }
    if(tel_user.value==''){
        error_alert.textContent+=" - Tel  is empty.";
    }
    if(adress_user.value==''){
        error_alert.textContent+=" - Adress  is empty.";
    }
    if(email_user.value=='' || !emailValide(email_user.value)){
        error_alert.textContent+=" - Email  is empty or invalide.";
    }
    if(password_user.value==''){
        error_alert.textContent+=" - Password  is empty.";
    }
    if(error_alert.textContent==''){
        return true ;
    }
    error_alert.style.display='block';
    return false ;
}

function emailValide(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
