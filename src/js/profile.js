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

const inputFields = document.querySelectorAll("input");

window.addEventListener("load", showProfile(data[0]));
window.addEventListener("load", () => {
  inputFields.forEach((input) => {
    input.disabled = true;
  });
});

function showProfile(user) {
  document.querySelector("#name").value = user.name;
  document.querySelector("#birthday").value = user.dob;
  if (user.phone_number) {
    document.querySelector("#tlf").value = user.phone_number;
  } else {
    document.querySelector("#tlf").value = "";
  }
  document.querySelector("#mail").value = user.email;

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
const editButton = document.querySelector(".edit");
const saveButton = document.querySelector(".save");

editButton.addEventListener("mousedown", () => {
  inputFields.forEach((input) => {
    input.disabled = false;
    input.classList.add("active");
  });
  editButton.classList.add("hide");
  saveButton.classList.remove("hide");
});

saveButton.addEventListener("mousedown", () => {
  inputFields.forEach((input) => {
    input.disabled = true;
    input.classList.remove("active");
  });
  editButton.classList.remove("hide");
  saveButton.classList.add("hide");
});

const form = document.getElementById("person-data");

saveButton.addEventListener("mousedown", (e) => {
  e.preventDefault();
  console.log(form.elements.birthday.value.length > 0);
  if (form.elements.birthday.value.length > 0) {
    obj = {
      name: form.elements.name.value,
      phone_number: parseInt(form.elements.tlf.value),
      email: form.elements.mail.value,
      dob: form.elements.birthday.value,
    };
  } else {
    obj = {
      name: form.elements.name.value,
      phone_number: parseInt(form.elements.tlf.value),
      email: form.elements.mail.value,
    };
  }
  savePersonalInformation(obj);
});

async function savePersonalInformation(info) {
  console.log(JSON.stringify(info));
  fetch(
    `https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data?id=eq.${uuid}`,
    {
      method: "PATCH",
      body: JSON.stringify(info),
      headers: {
        apikey: api,
        Prefer: "return=representation",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {});
}
