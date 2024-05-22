import { v4 as uuidv4 } from "uuid";

const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
const letter = document.getElementById("letter");
const number = document.getElementById("number");
const length = document.getElementById("length");
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;

window.addEventListener("load", () => {
  document.getElementById("username").focus();
  errorMessage.classList.add("hide");
  letter.classList.add("hide");
  number.classList.add("hide");
  length.classList.add("hide");
  document.getElementById("error").classList.add("hide");
  passwordInput.classList.remove("invalid");
});

document
  .querySelector(".info-icon")
  .addEventListener("click", () =>
    document.querySelector(".password-dialog").showModal()
  );

document.querySelector(".close-button").addEventListener("mousedown", () => {
  document.querySelector(".password-dialog").close();
});

const passwordButton = document.getElementById("password-button");
passwordButton.addEventListener("mousedown", () => {
  if (passwordButton.classList.contains("password-on")) {
    passwordButton.classList.remove("password-on");
    passwordButton.classList.add("password-off");
    document.getElementById("password").type = "text";
  } else {
    passwordButton.classList.remove("password-off");
    passwordButton.classList.add("password-on");
    document.getElementById("password").type = "password";
  }
});

const repeatPasswordButton = document.getElementById("repeatPassword-button");
repeatPasswordButton.addEventListener("mousedown", () => {
  if (repeatPasswordButton.classList.contains("password-on")) {
    repeatPasswordButton.classList.remove("password-on");
    repeatPasswordButton.classList.add("password-off");
    document.getElementById("repeatPassword").type = "text";
  } else {
    repeatPasswordButton.classList.remove("password-off");
    repeatPasswordButton.classList.add("password-on");
    document.getElementById("repeatPassword").type = "password";
  }
});

const url = "https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data";
const api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

// A fetch request is being sent in order to post the data that the user has put in
function signUp(newUser) {
  const options = {
    method: "POST",
    headers: {
      apikey: api,
      Authorization: "Bearer " + api,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(newUser),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      window.location.href = "/gemte-programmer";
    });
}

const form = document.querySelector(".sign-up");

// The following function checks if the password includes an upper and a lower case letter and a number.
// It also checks if the password is at least 8 characters long
// An error message will be displayed if one of the four requirements is not being met
function displayErrorMessage() {
  document.getElementById("error").classList.add("hide");
  if (
    !passwordInput.value.match(lowerCaseLetters) ||
    !passwordInput.value.match(upperCaseLetters)
  ) {
    passwordInput.classList.add("invalid");
    errorMessage.classList.remove("hide");
    letter.classList.remove("hide");
  } else if (!passwordInput.value.match(numbers)) {
    passwordInput.classList.add("invalid");
    errorMessage.classList.remove("hide");
    letter.classList.add("hide");
    number.classList.remove("hide");
  } else if (passwordInput.value.length < 8) {
    passwordInput.classList.add("invalid");
    errorMessage.classList.remove("hide");
    number.classList.add("hide");
    length.classList.remove("hide");
  } else if (
    form.elements.password.value != form.elements.repeatPassword.value
  ) {
    errorMessage.classList.add("hide");
    document.getElementById("error").classList.remove("hide");
  } else {
    document.getElementById("error").classList.add("hide");
  }
}

// When clicking submit (the button fortsæt) an uuid will be set as user id and the username will be set
// according to the inputfield "username" value. The password will be set to the value of the inputfield "password"
// This will be stored in an object. If all requirements for the password is met it will execute the signUp function
// where obj will be sent as a parameter. If the two password inputfields values are different from eachother
// an error message will be displayed. If the requirements are not fulfilled the displayErrorMessage function will be executed
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const uuid = uuidv4();
  const obj = {
    id: uuid,
    username: form.elements.username.value,
    password: form.elements.password.value,
  };
  if (
    form.elements.password.value === form.elements.repeatPassword.value &&
    passwordInput.value.match(lowerCaseLetters) &&
    passwordInput.value.match(upperCaseLetters) &&
    passwordInput.value.match(numbers) &&
    passwordInput.value.length >= 8
  ) {
    signUp(obj);
  } else if (
    form.elements.password.value !== form.elements.repeatPassword.value
  ) {
    errorMessage.classList.add("hide");
    document.getElementById("error").classList.remove("hide");
  } else {
    displayErrorMessage();
  }
});
