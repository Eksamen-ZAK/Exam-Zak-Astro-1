import { v4 as uuidv4 } from "uuid";

const url = "https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data";
const api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

// fetching
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
const addButtons = document.querySelectorAll(".exerciseButton");
const parentElement = document.querySelector(".program-list");
const template = document.querySelector(".small-exercise-card").content;

// Tilføjer eventListeners til "tilføj"-knapperne
// Øvelsen, som man har klikket på, har et id, som bliver indsat i et array "programArray".
// De fetchede data bliver filtreret, så det kun er de id'er fra arrayet, hvis data bliver mappet igennem
// Under mappingen bliver der clonet et template for hver tilføjet øvelse, og data fra øvelserne indsættes i templatet.
// Der tilføjes eventListeners til fjern-knapperne, som fjerner øvelsens id fra arrayet
// Til sidst bliver templatet tilføjet til parenElement "program-list" vha. appendChild

let programArray = JSON.parse(sessionStorage.getItem("program-list")) || [];
if (sessionStorage.getItem("program-title")) {
  document.getElementById("program_title").value =
    sessionStorage.getItem("program-title");
}
if (sessionStorage.getItem("program-description")) {
  document.getElementById("description").value = sessionStorage.getItem(
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
  mappingProgram(filteredData, programArray);
}
addButtons.forEach((button) => {
  const buttonId = button.getAttribute("data-button-id");
  button.addEventListener("mousedown", () => {
    button.classList.add("disabled-green");
    button.classList.remove("green");
    document.querySelector(".save").addEventListener("mousedown", () => {
      if (programArray.length > 0) {
        document.querySelector(".program-modal").showModal();
      }
    });

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
        document.getElementById(`text-${exercise.image}`).textContent =
          "Tilføj";
        document.getElementById(exercise.image).classList.add("green");
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
    return programArray;
  });
}

// Funktioner, som holder styr på antallet af repitioner for hver enkel øvelse

let count;

// Funktion, der lægger 5 repititioner til
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

const options = {
  method: "GET",
  headers: {
    apikey: api,
  },
};

// Funktion, der trækker 5 repititioner fra
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

let uuid;
let obj;

if (localStorage.getItem("uuid")) {
  uuid = localStorage.getItem("uuid");
} else {
  uuid = sessionStorage.getItem("uuid");
}

let res = await fetch(url + `?id=eq.${uuid}`, {
  method: "GET",
  headers: { apikey: api },
});

const userData = await res.json();
let programUuid;
document
  .querySelector(".back-button")
  .addEventListener("mousedown", () =>
    document.querySelector(".program-modal").close()
  );
const form = document.getElementById("program-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (sessionStorage.getItem("program-id")) {
    programUuid = sessionStorage.getItem("program-id");
  } else {
    programUuid = uuidv4();
  }
  if (
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
          programList: programArray,
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
          programList: programArray,
        },
      ],
    };
  }
  saveProgram(obj);
});

//patching program liste
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
