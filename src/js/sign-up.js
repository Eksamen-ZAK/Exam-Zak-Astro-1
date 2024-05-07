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

const url = "https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data";
const api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

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

passwordInput.addEventListener("focus", validator);
passwordInput.addEventListener("keyup", validator);
document.getElementById("repeatPassword").addEventListener("keyup", validator);

function validator() {
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
  }
});
