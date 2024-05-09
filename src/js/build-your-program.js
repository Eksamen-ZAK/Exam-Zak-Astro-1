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

buttons.forEach((button) => {
  const buttonId = button.getAttribute("data-button-id");

  button.addEventListener("mousedown", () => {
    if (!programArray.includes(buttonId)) {
      programArray.push(buttonId);
      filteredData = data.filter((exercise) => {
        if (programArray.includes(exercise.image)) {
          return true;
        } else {
          return false;
        }
      });
      document.querySelector(".program-list").innerHTML = filteredData
        .map((exercise) => {
          return `<article class="remove">
            <img src="../assets/images/${exercise.image}.webp" alt="${
            exercise.title
          } image" />
            <div class="text-container">
              <h3>${exercise.title}</h3>
              <h3 class="note">${exercise.note ? exercise.note : ""}</h3>
              <p>${exercise.description}</p>
              <div>
                <div class="small-card" data-card-id="${exercise.id}">
                  <button id={"minus-${exercise.id}"}>
                    <img src="assets/minus-black.svg" alt="minus icon" />
                  </button>
                  <div><p id={"number-${exercise.id}"}></p></div>
                  <button id={"plus-${exercise.id}"}>
                    <img src="assets/plus-black.svg" alt="plus icon" />
                  </button>
                </div>
                <button
                  type="button"
                  class="exerciseButton red x-small"
                  data-button-id="${exercise.image}"
                >
                  <p>Fjern</p>
                  <div class="icon" id="trashcan"></div>
                </button>
              </div>
            </div>
          </article>`;
        })
        .join("");
    }
  });

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
      return filteredData;
    }
  });
});

document
  .querySelector(".exerciseButton")
  .addEventListener("mousedown", () => console.log(filteredData));
