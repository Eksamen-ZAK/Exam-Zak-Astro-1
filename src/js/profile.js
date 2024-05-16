const api = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

let headersList = {
  apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE",
};

let response = await fetch("https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data", {
  method: "GET",
  headers: headersList,
});

const data = await response.json();

showProfile(data[0]);

function showProfile(user) {
  console.log(user);

  //document.querySelector(".profile-pic").src = `img/${user.img}`;
  document.querySelector("#name").textContent = user.name;
  document.querySelector("#birthday").textContent = user.dob;
  document.querySelector("#tlf").textContent = "+45 " + user.phone_number;
  document.querySelector("#mail").textContent = user.email;

  document.querySelector("#user-name").textContent = user.username;
  document.querySelector("#userID").textContent = user.id;
  document.querySelector("#accessdate").innerHTML = user.created_at;

  document.querySelector(".info-lists").appendChild(document.createElement("div"));
}
