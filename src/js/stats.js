let uuid;

if (localStorage.getItem("uuid")) {
  uuid = localStorage.getItem("uuid");
} else {
  uuid = sessionStorage.getItem("uuid");
}

const url = `https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data?id=eq.${uuid}`;
const api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

const options = {
  method: "GET",
  headers: {
    apikey: api,
  },
};

const userData = await fetch(url, options).then((res) => {
  if (!res.ok) {
    window.location.href = "/";
  }
  return res.json();
});

const parentElement = document.querySelector(".goals-list");
const template = document.querySelector(".goal-card-template").content;

if (userData[0].goals) {
  userData[0].goals.map((data) => {
    const myClone = template.cloneNode(true);
    myClone
      .querySelector(".goal-card")
      .setAttribute("data-card-id", data.programId);
    myClone
      .querySelector(".edit-button")
      .setAttribute("id", `edit-button-${data.programId}`);
    myClone.querySelector(".program-name").textContent = data.goalTitle;
    myClone
      .querySelector(".edit-button")
      .setAttribute("id", `edit-button-${data.programId}`);
    myClone.querySelector(".start-date").textContent = ` ${data.startDate.slice(
      8,
      10
    )}/${data.startDate.slice(5, 7)}-${data.startDate.slice(0, 4)}`;
    myClone.querySelector(".end-date").textContent = ` ${data.endDate.slice(
      8,
      10
    )}/${data.endDate.slice(5, 7)}-${data.endDate.slice(0, 4)}`;
    myClone.querySelector(".goal-number").textContent = data.goalNumber;
    myClone
      .querySelector(".goal-image")
      .setAttribute(
        "src",
        `../assets/images/${data.goalProgramList.slice(0, 3)}.webp`
      );
    myClone
      .getElementById(`edit-button-${data.programId}`)
      .addEventListener("mousedown", () => {
        sessionStorage.setItem("program-id", data.programId);
        sessionStorage.setItem("goal-number", data.goalNumber);
        sessionStorage.setItem("start-date", data.startDate);
        sessionStorage.setItem("end-date", data.endDate);
        sessionStorage.setItem("program-title", data.goalTitle);
        sessionStorage.setItem("program-list", data.goalProgramList);
        if (sessionStorage.getItem("goal-number")) {
          document.getElementById("goal_setting").value =
            sessionStorage.getItem("goal-number");
        }

        if (sessionStorage.getItem("start-date")) {
          document.getElementById("goal_start").value =
            sessionStorage.getItem("start-date");
        }
        if (sessionStorage.getItem("end-date")) {
          document.getElementById("goal_end").value =
            sessionStorage.getItem("end-date");
        }
        document.querySelector(".goal-modal").showModal();
      });
    parentElement.appendChild(myClone);
  });
}

let item;
let goalId;
let goalProgram;
let goalProgramList;

document.querySelector(".back-button").addEventListener("mousedown", () => {
  document.querySelector(".goal-modal").close();
});

const form = document.getElementById("goal-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  goalId = sessionStorage.getItem("program-id");
  goalProgram = sessionStorage.getItem("program-title");
  goalProgramList = sessionStorage.getItem("program-list");

  if (
    userData[0].goals &&
    userData[0].goals.findIndex((item) => item.programId === goalId) > -1
  ) {
    const index = userData[0].goals.findIndex(
      (item) => item.programId === goalId
    );
    userData[0].goals.splice(index, 1);
  }
  if (userData[0].goals) {
    item = {
      goals: userData[0].goals.concat([
        {
          programId: goalId,
          goalTitle: goalProgram,
          goalProgramList: goalProgramList,
          goalNumber: form.elements.goal_setting.value,
          startDate: form.elements.goal_start.value,
          endDate: form.elements.goal_end.value,
        },
      ]),
    };
  } else {
    item = {
      goals: [
        {
          programId: goalId,
          goalTitle: goalProgram,
          goalProgramList: goalProgramList,
          goalNumber: form.elements.goal_setting.value,
          startDate: form.elements.goal_start.value,
          endDate: form.elements.goal_end.value,
        },
      ],
    };
  }
  saveGoal(item);
});

//patching program liste
async function saveGoal(program) {
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
      location.reload();
    });
}
