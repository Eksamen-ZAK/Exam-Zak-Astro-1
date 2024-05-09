const url = "https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data";
const api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

function addExercise() {
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
}
let headersList = {
  apikey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE",
};

let response = await fetch(
  "https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/exercises",
  {
    method: "GET",
    headers: headersList,
  }
);

const data = await response.json();
const programArray = [];
const buttons = document.querySelectorAll(".exerciseButton");

buttons.forEach((button) => {
  const buttonId = button.getAttribute("data-button-id");

  button.addEventListener("mousedown", () => {
    if (!programArray.includes(buttonId)) {
      programArray.push(buttonId);
    }
    return programArray;
  });

  button.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      if (!programArray.includes(buttonId)) {
        programArray.push(buttonId);
      }
      return programArray;
    }
  });
});

export const exercisesList = programArray;

if (programArray) {
  data.forEach((exercise) => {
    programArray.forEach((listItem) => {
      console.log(listItem);
      if (listItem === exercise.image) {
        console.log(exercise.image);
      }
    });
  });
}
