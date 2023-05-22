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

    colId.textContent=e.id;
    colNom.textContent=e.nom;
    colPrenom_user.textContent=e.prenome;
    colTel_user.textContent=e.tel;
    colAdress_user.textContent=e.adress;
    colEmail_user.textContent=e.email;


    row.appendChild(colId);
    row.appendChild(colNom);
    row.appendChild(colPrenom_user);
    row.appendChild(colTel_user);
    row.appendChild(colAdress_user);
    row.appendChild(colEmail_user);

    table_body.appendChild(row);
  }

function resetColumns(){
    user_id.value=null;
    prenom_user.value=null;
    nom_user.value=null;
    tel_user.value=null;
    adress_user.value=null;
    email_user.value=null;
    password_user.value=null;
}


function editUser(e){
    nom_user.value=e.nom;
    user_id.value=e.id;
    prenom_user.value=e.prenome;
    tel_user.value=e.tel;
    adress_user.value=e.adress;
    email_user.value=e.email;

}

function showForm(){
    users_form.style.display="block";
    const editProfile_btn=document.getElementById("editProfile_btn");
    editProfile_btn.style.display="none";
    updateUser_btn.style.display="block";
}

function getData(){
    console.log("loading data...");
    var xhr = new XMLHttpRequest();
    var urlget = "http://127.0.0.1:8000/api/profile";

    xhr.open("GET", urlget, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var u = new User(response.id,response.nom, response.prenome,response.tel,response.adress,response.email,response.email);
        addUserInTable(u);
        editUser(u);
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
        prenome : prenom_user.value,
        tel : tel_user.value,
        adress : adress_user.value,
        email : email_user.value,
        password : password_user.value,
    };
    console.log(payload);
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        users_form.style.display="none";
        editProfile_btn.style.display="block";
        alert('les informations sont modifier');
        resetColumns();
        while (table_body.firstChild) {
            table_body.removeChild(table_body.firstChild);
        }
        getData();
    }
    };
    xhr.send(JSON.stringify(payload));

}
