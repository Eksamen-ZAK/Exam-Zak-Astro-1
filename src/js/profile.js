let uuid;
let obj;
const url = "https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data";
const api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

if (localStorage.getItem("uuid")) {
  uuid = localStorage.getItem("uuid");
} else {
  uuid = sessionStorage.getItem("uuid");
}

const data = await fetch(url + `?id=eq.${uuid}`, {
  method: "GET",
  headers: { apikey: api },
}).then((res) => {
  if (!res.ok) {
    window.location.href = "/";
  }
  return res.json();
});

window.addEventListener("load", showProfile(data[0]));

function showProfile(user) {
  //document.querySelector(".profile-pic").src = `img/${user.img}`;
  document.querySelector("#name").textContent = user.name;
  document.querySelector("#birthday").textContent = user.dob;
  document.querySelector("#tlf").textContent = user.phone_number;
  document.querySelector("#mail").textContent = user.email;

  document.querySelector("#user-name").textContent = user.username;
  document.querySelector("#userID").textContent = uuid;
  document.querySelector("#accessdate").innerHTML = user.created_at.slice(
    0,
    10
  );

  document
    .querySelector(".info-lists")
    .appendChild(document.createElement("div"));
}

document.querySelector(".log-out").addEventListener("click", () => {
  sessionStorage.setItem("uuid", "");
  localStorage.setItem("uuid", "");
  window.location.href = "/";
});
