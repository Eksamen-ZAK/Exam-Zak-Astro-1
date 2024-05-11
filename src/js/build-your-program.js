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
let dataFilter;
const addbButtons = document.querySelectorAll(".exerciseButton");
const parentElement = document.querySelector(".program-list");
const template = document.querySelector(".small-exercise-card").content;

addbButtons.forEach((button) => {
  const buttonId = button.getAttribute("data-button-id");
  button.addEventListener("mousedown", () => {
    button.classList.add("disabled-green");
    button.setAttribute("id", buttonId);
    if (!programArray.includes(buttonId)) {
      parentElement.innerHTML = "";
      programArray.push(buttonId);
      filteredData = data.filter((exercise) => {
        if (programArray.includes(exercise.image)) {
          return true;
        } else {
          return false;
        }
      });
      mappingProgram(filteredData, programArray);
    }
  });
});

function mappingProgram(filteredData, programArray) {
  filteredData.map((exercise) => {
    const myClone = template.cloneNode(true);
    myClone
      .querySelector("img")
      .setAttribute("src", `../assets/images/${exercise.image}.webp`);
    myClone.querySelector(".title").textContent = exercise.title;
    myClone.querySelector(".note").textContent = exercise.note;
    myClone.querySelector(".description").textContent = exercise.description;
    myClone
      .querySelector(".small-card")
      .setAttribute("data-card-id", exercise.id);
    myClone
      .querySelector(".x-small")
      .setAttribute("id", `x-small-${exercise.id}`);
    myClone.querySelector(".minus").setAttribute("id", `minus-${exercise.id}`);
    myClone
      .getElementById(`minus-${exercise.id}`)
      .addEventListener("mousedown", () => {
        retractRepitition(exercise.id);
      });
    myClone
      .querySelector(".number")
      .setAttribute("id", `number-${exercise.id}`);

    myClone.getElementById(`number-${exercise.id}`).textContent = parseInt(
      document
        .getElementById(`number-normal-${exercise.id}`)
        .getAttribute("data-total-repititions")
    );
    myClone
      .getElementById(`x-small-${exercise.id}`)
      .addEventListener("mousedown", () => {
        parentElement.innerHTML = "";
        const index = programArray.indexOf(exercise.image);
        programArray.splice(index, 1);
        dataFilter = data.filter((exercise) => {
          if (programArray.includes(exercise.image)) {
            return true;
          } else {
            return false;
          }
        });
        document
          .getElementById(exercise.image)
          .classList.remove("disabled-green");
        mappingProgram(dataFilter, programArray);
      });
    myClone
      .getElementById(`number-${exercise.id}`)
      .setAttribute(
        "data-total-repititions",
        parseInt(
          document
            .getElementById(`number-normal-${exercise.id}`)
            .getAttribute("data-total-repititions")
        )
      );

    myClone.querySelector(".plus").setAttribute("id", `plus-${exercise.id}`);
    myClone
      .getElementById(`plus-${exercise.id}`)
      .addEventListener("mousedown", () => addRepitition(exercise.id));
    parentElement.appendChild(myClone);
  });
}

let count;
function addRepitition(id) {
  count = parseInt(
    document
      .getElementById(`number-${id}`)
      .getAttribute("data-total-repititions")
  );

  count = count + 5;
  document.getElementById(`number-${id}`).textContent = count.toString();
  document
    .getElementById(`number-${id}`)
    .setAttribute("data-total-repititions", count.toString());
  document
    .getElementById(`number-normal-${id}`)
    .setAttribute("data-total-repititions", count.toString());
}
function retractRepitition(id) {
  count = parseInt(
    document
      .getElementById(`number-${id}`)
      .getAttribute("data-total-repititions")
  );
  if (count > 5) {
    count = count - 5;
    document.getElementById(`number-${id}`).textContent = count.toString();
    document
      .getElementById(`number-${id}`)
      .setAttribute("data-total-repititions", count.toString());
    document
      .getElementById(`number-normal-${id}`)
      .setAttribute("data-total-repititions", count.toString());
  }
}
