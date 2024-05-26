let uuid;
let obj;
const url = "https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data";
const api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

//Getting the uuid from either localStorage or sessionStorage
//If the user is automatically logged in, the uuid will be stored in localStorage. Otherwise it is stored in sessionStorage
if (localStorage.getItem("uuid")) {
  uuid = localStorage.getItem("uuid");
} else {
  uuid = sessionStorage.getItem("uuid");
}

//Fetching the data filtered by the uuid. If the uuid isn't stored in either localStorage or sessionStorage
// then the user isn't logged in and will therefore be send to the starting page.
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

// The inputfields will be disabled when the window loads
window.addEventListener("load", showProfile(data[0]));
window.addEventListener("load", () => {
  inputFields.forEach((input) => {
    input.disabled = true;
  });
});

// The different input fields values are set to the values that are being fetched from the database
// If there are existing personal information stored in the database it will thereby be diplayed when the window loads
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
}

// Adding an eventListener to the button "log-out". When clicking on it the stored item uuid will be set to ""
// and therefore emptied. The window location will also be set to "/" which takes the user to the starting page.
document.querySelector(".log-out").addEventListener("click", () => {
  sessionStorage.setItem("uuid", "");
  localStorage.setItem("uuid", "");
  window.location.href = "/";
});

const editButton = document.querySelector(".edit");
const saveButton = document.querySelector(".save");

// When clicking the edit button, the inputfields will be available by setting disabled to false,
// and the class "hide" will be added to the button, so it is hidden. The class "hide" will also removed from
// the button "gem" which makes it available for the user to save his or hers personal information after filling out the inputfields.
editButton.addEventListener("click", () => {
  inputFields.forEach((input) => {
    input.disabled = false;
    input.classList.add("active");
  });
  editButton.classList.add("hide");
  saveButton.classList.remove("hide");
});

// The gem button does the opposite. It disables the inputfields. The user is thereby not able to fill out the inputfields
// It also hides the gem button and shows the rediger button
saveButton.addEventListener("click", (e) => {
  inputFields.forEach((input) => {
    input.disabled = true;
    input.classList.remove("active");
  });
  editButton.classList.remove("hide");
  saveButton.classList.add("hide");
  saveData(e);
});

const form = document.getElementById("person-data");

// When clicking the save button the form element's values will be stored in an object as the value of their respective
// properties. Afterward the object will be sent as a parameter to the function savePersonalInformation.
// The form element "birthday" is only sent when the length of the inputfield is longer than 0
// Otherwise there would be an error when sending a fetch request
function saveData(e) {
  e.preventDefault();
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
}

// The object is being patched through a fetch request to the database
async function savePersonalInformation(info) {
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
