import { v4 as uuidv4 } from "uuid";

const url = "https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data";
const api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

// fetching the different exercises that are stored in the database
let response = await fetch(
  "https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/exercises",
  {
    method: "GET",
    headers: { apikey: api },
  }
);

const data = await response.json();

let filteredData;
let dataFilter;
let programArray = [];
let exercisesList = [];
const addButtons = document.querySelectorAll(".exerciseButton");
const parentElement = document.querySelector(".program-list");
const template = document.querySelector(".small-exercise-card").content;

// If the program-list is stored in sessionStorage, the programArray will be set to a list consisting of the exercises from the stored program list.
if (sessionStorage.getItem("program-list")) {
  exercisesList = JSON.parse(sessionStorage.getItem("program-list"));
  programArray = exercisesList.map((arr) => arr[0]);
}

// If the program title is stored in sessionStorage, the inputfield with id: "program-title" in
// the pop up modal "ProgramModal" will be set to the stored program title.
if (sessionStorage.getItem("program-title")) {
  document.getElementById("program_title").value =
    sessionStorage.getItem("program-title");
}
// If the program description is stored in sessionStorage, the inputfield with id: "program-description in
// the pop up modal "ProgramModal" will be set to the stored program description.
if (sessionStorage.getItem("program-description")) {
  document.getElementById("program_description").value = sessionStorage.getItem(
    "program-description"
  );
}

if (programArray.length > 0) {
  filteredData = data.filter((exercise) => {
    if (programArray.includes(exercise.image)) {
      return true;
    } else {
      return false;
    }
  });
  mappingProgram(filteredData, programArray, exercisesList);
}

// Adding evenListener to the "Gem" button, when minimum one exercise has been added.
document.querySelector(".save").addEventListener("mousedown", () => {
  if (exercisesList.length > 0) {
    document.querySelector(".program-modal").showModal();
  }
});

// Adding eventListeners to the "Tilføj"-buttons
// The exercise, that is clicked on, has an id, that is getting pushed into the array "programArray".
// The fetched data is being filtrered, in order to only show the id's from the array, that is being mapped through
addButtons.forEach((button) => {
  const buttonId = button.getAttribute("data-button-id");
  button.addEventListener("mousedown", () => {
    button.classList.add("disabled-green");
    button.classList.remove("green");

    if (!programArray.includes(buttonId)) {
      parentElement.innerHTML = "";
      programArray.push(buttonId);
      exercisesList.push([
        buttonId,
        document
          .getElementById(`number-normal-${buttonId.replace(/^0+(?=\d)/, "")}`)
          .getAttribute("data-total-repititions"),
      ]);
      filteredData = data.filter((exercise) => {
        if (programArray.includes(exercise.image)) {
          return true;
        } else {
          return false;
        }
      });
      mappingProgram(filteredData, programArray, exercisesList);
    }
  });
});

// When mapping, the template is being cloned for each added exercise, and the data from the exercises is added to the template.
// There is added  eventListeners to the "fjern"-buttons, that removes the exercise id from the array
// In the end the template is added to the parenElement "program-list" by using appendChild
function mappingProgram(filteredData, programArray, exercisesList) {
  filteredData.map((exercise) => {
    document.getElementById(`text-${exercise.image}`).textContent = "Tilføjet";
    document.getElementById(exercise.image).classList.add("disabled-green");
    const myClone = template.cloneNode(true);
    myClone
      .querySelector("img")
      .setAttribute("src", `../assets/images/${exercise.image}.webp`);
    myClone.querySelector(".title").textContent = exercise.title;
    myClone.querySelector(".note").textContent = exercise.note;

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

    exercisesList.map((arr) => {
      if (arr.includes(exercise.image)) {
        myClone.getElementById(`number-${exercise.id}`).textContent = parseInt(
          arr[1]
        );
        myClone
          .getElementById(`number-${exercise.id}`)
          .setAttribute("data-total-repititions", parseInt(arr[1]));
      }
    });

    myClone
      .getElementById(`x-small-${exercise.id}`)
      .addEventListener("mousedown", () => {
        parentElement.innerHTML = "";
        const index = programArray.indexOf(exercise.image);
        programArray.splice(index, 1);
        exercisesList.splice(index, 1);
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
        document.getElementById(`text-${exercise.image}`).textContent =
          "Tilføj";
        document.getElementById(exercise.image).classList.add("green");
        mappingProgram(dataFilter, programArray, exercisesList);
      });

    myClone.querySelector(".plus").setAttribute("id", `plus-${exercise.id}`);
    myClone
      .getElementById(`plus-${exercise.id}`)
      .addEventListener("mousedown", () => addRepitition(exercise.id));
    parentElement.appendChild(myClone);
    return programArray;
  });
}

// Functions that changes the number of repititions for every exercise

let count;

// Function that adds 5 repititions
function addRepitition(id) {
  count = parseInt(
    document
      .getElementById(`number-${id}`)
      .getAttribute("data-total-repititions")
  );
  count = count + 5;

  const index = exercisesList.findIndex((item) => item[0] === `00${id}`);
  exercisesList.splice(index, 1, ["00" + id, count.toString()]);
  document.getElementById(`number-${id}`).textContent = count.toString();
  document
    .getElementById(`number-${id}`)
    .setAttribute("data-total-repititions", count.toString());
}

const options = {
  method: "GET",
  headers: {
    apikey: api,
  },
};

// Function that subtracts 5 repititions
function retractRepitition(id) {
  count = parseInt(
    document
      .getElementById(`number-${id}`)
      .getAttribute("data-total-repititions")
  );
  if (count > 5) {
    count = count - 5;
    const index = exercisesList.findIndex((item) => item[0] === `00${id}`);
    exercisesList.splice(index, 1, ["00" + id, count.toString()]);
    document.getElementById(`number-${id}`).textContent = count.toString();
    document
      .getElementById(`number-${id}`)
      .setAttribute("data-total-repititions", count.toString());
  }
}

let uuid;
let obj;

//Getting the uuid from either localStorage or sessionStorage
//If the user is automatically logged in, the uuid will be stored in localStorage. Otherwise it is stored in sessionStorage
if (localStorage.getItem("uuid")) {
  uuid = localStorage.getItem("uuid");
} else {
  uuid = sessionStorage.getItem("uuid");
}

//Fetching the data filtered by the uuid. If the uuid isn't stored in either localStorage or sessionStorage
// then the user isn't logged in and will therefore be send to the starting page.
const userData = await fetch(url + `?id=eq.${uuid}`, {
  method: "GET",
  headers: { apikey: api },
}).then((res) => {
  if (!res.ok) {
    window.location.href = "/";
  }
  return res.json();
});

let programUuid;

// An eventListener is added to the back button in order to close the program modal when clicking the button
document
  .querySelector(".back-button")
  .addEventListener("mousedown", () =>
    document.querySelector(".program-modal").close()
  );

// When clicking the submit button "gem" in the program modal, the form data will be stored in an object
// If the program uuid already exists in the database it will be removed and replaced with the new program list
// The program will be added to the list of saved programs in the database by sending the object as a parameter
// to the saveProgram function
const form = document.getElementById("program-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (sessionStorage.getItem("program-id")) {
    programUuid = sessionStorage.getItem("program-id");
  } else {
    programUuid = uuidv4();
  }
  if (
    userData[0].saved_programs &&
    userData[0].saved_programs.findIndex(
      (item) => item.programId === programUuid
    ) > -1
  ) {
    const index = userData[0].saved_programs.findIndex(
      (item) => item.programId === programUuid
    );
    userData[0].saved_programs.splice(index, 1);
  }
  if (userData[0].saved_programs) {
    obj = {
      saved_programs: userData[0].saved_programs.concat([
        {
          programId: programUuid,
          programTitle: form.elements.program_title.value,
          programDescription: form.elements.program_description.value,
          programList: exercisesList,
        },
      ]),
    };
  } else {
    obj = {
      saved_programs: [
        {
          programId: programUuid,
          programTitle: form.elements.program_title.value,
          programDescription: form.elements.program_description.value,
          programList: exercisesList,
        },
      ],
    };
  }
  saveProgram(obj);
});

// A fetch request is being sent to the database in order to patch the program list
// The program modal will close when the program has been sent to the database
async function saveProgram(program) {
  fetch(
    `https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data?id=eq.${uuid}`,
    {
      method: "PATCH",
      body: JSON.stringify(program),
      headers: {
        apikey: api,
        Prefer: "return=representation",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".program-modal").close();
    });
}
