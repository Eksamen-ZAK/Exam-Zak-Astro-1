window.addEventListener("load", () => {
  document.getElementById("log-in-username").focus();
  document.getElementById("error").classList.add("hide");
});

// Checking if the uuid is stored in local storage. If that's the case, the user has previously
// checked off "stay signed in", and will therefore be redirected to the page "gemte-programmer"
if (localStorage.getItem("uuid")) {
  window.location.href = "/gemte-programmer";
}
// When clicking submit a fetch request will be sent to the database
// Data that matches the username (which the user has put in the inputfield log-in-username) will be fetched
const form = document.querySelector("form");

form.addEventListener("submit", logInFunction);

async function logInFunction(e) {
  e.preventDefault();

  const username = document.getElementById("log-in-username").value;
  const password = document.getElementById("log-in-password").value;

  const url = `https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data?username=eq.${username}`;
  const api =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

  const options = {
    method: "GET",
    headers: {
      apikey: api,
    },
  };

  // If the fetch request fails, the data don't exist in the database and an error message will be displayed
  // telling the user that either the username or the password is wrong
  const data = await fetch(url, options).then((res) => {
    if (!res.ok) {
      document.getElementById("error").classList.remove("hide");
    }
    return res.json();
  });

  // If the password that the user has inserted in the inputfield doesn't match the password in the database
  // and error message will be displayed, telling the user that either the username or the password is wrong
  // If the password is equal to the password from the database, the user will be redirected to the page /gemte-programmer
  if (data.length > 0 && data[0].password === password) {
    if (document.getElementById("auto-log-in").checked) {
      localStorage.setItem("uuid", data[0].id);
    }
    sessionStorage.setItem("uuid", data[0].id);
    document.getElementById("error").classList.add("hide");
    window.location.href = "/gemte-programmer";
  } else {
    document.getElementById("error").classList.remove("hide");
  }
}

const passwordButton = document.getElementById("log-in-password-button");
passwordButton.addEventListener("mousedown", () => {
  if (passwordButton.classList.contains("password-on")) {
    passwordButton.classList.remove("password-on");
    passwordButton.classList.add("password-off");
    document.getElementById("log-in-password").type = "text";
  } else {
    passwordButton.classList.remove("password-off");
    passwordButton.classList.add("password-on");
    document.getElementById("log-in-password").type = "password";
  }
});
