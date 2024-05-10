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
let programArray = [];
let filteredData;
const buttons = document.querySelectorAll(".exerciseButton");
const parentElement = document.querySelector(".program-list");
const template = document.querySelector(".small-exercise-card").content;
buttons.forEach((button) => {
  const buttonId = button.getAttribute("data-button-id");
  button.addEventListener("mousedown", () => {
    if (!programArray.includes(buttonId)) {
      parentElement.innerHTML = "";
      programArray.push(buttonId);
      filteredData = data
        .filter((exercise) => {
          if (programArray.includes(exercise.image)) {
            return true;
          } else {
            return false;
          }
        })
        .map((exercise) => {
          const myClone = template.cloneNode(true);
          myClone
            .querySelector("img")
            .setAttribute("src", `../assets/images/${exercise.image}.webp`);
          myClone.querySelector(".title").textContent = exercise.title;
          myClone.querySelector(".note").textContent = exercise.note;
          myClone.querySelector(".description").textContent =
            exercise.description;
          myClone
            .querySelector(".small-card")
            .setAttribute("data-card-id", exercise.id);
          myClone
            .querySelector(".minus")
            .setAttribute("id", `minus-${exercise.id}`);
          exercise.description;
          myClone
            .querySelector(".number")
            .setAttribute("id", `number-${exercise.id}`);
          exercise.description;
          myClone
            .querySelector(".plus")
            .setAttribute("id", `plus-${exercise.id}`);
          exercise.description;
          parentElement.appendChild(myClone);
        });
    }

    button.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        if (!programArray.includes(buttonId)) {
          programArray.push(buttonId);
          filteredData = data.filter((exercise) => {
            if (programArray.includes(exercise.image)) {
              return true;
            } else {
              return false;
            }
          });
        }
      }
    });
  });
});

document
  .querySelector(".exerciseButton")
  .addEventListener("mousedown", () => console.log(filteredData));
