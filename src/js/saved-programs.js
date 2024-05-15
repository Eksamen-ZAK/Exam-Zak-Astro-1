let uuid;
const url = "https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data";
const api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

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

const parentElement = document.querySelector(".program-list");
const template = document.querySelector(".card-template").content;

if (userData[0].saved_programs) {
  userData[0].saved_programs.map((data) => {
    const myClone = template.cloneNode(true);
    myClone
      .querySelector(".program-card")
      .setAttribute("data-card-id", data.programId);
    myClone.querySelector(".program-title").textContent = data.programTitle;
    if (data.programDescription) {
      myClone.querySelector(".program-description").textContent =
        data.programDescription;
    }
    myClone.querySelector(".edit").setAttribute("id", `edit-${data.programId}`);
    myClone
      .querySelector(".delete")
      .setAttribute("id", `delete-${data.programId}`);
    myClone
      .querySelector(".program-image")
      .setAttribute(
        "src",
        `../assets/images/${data.programList[0][0].slice(0, 3)}.webp`
      );
    myClone
      .getElementById(`edit-${data.programId}`)
      .addEventListener("mousedown", () => {
        window.location.href = `/lav-dit-program`;
        sessionStorage.setItem(
          "program-list",
          JSON.stringify(data.programList)
        );
        sessionStorage.setItem("program-id", data.programId);
        sessionStorage.setItem("program-title", data.programTitle);
        sessionStorage.setItem("program-description", data.programDescription);
      });
    myClone
      .getElementById(`delete-${data.programId}`)
      .addEventListener("mousedown", () => {
        const index = userData[0].saved_programs.findIndex(
          (item) => item.programId === data.programId
        );
        userData[0].saved_programs.splice(index, 1);
        obj = {
          saved_programs: userData[0].saved_programs,
        };
        saveProgram(obj);
      });
    parentElement.appendChild(myClone);
  });
}

let obj;

if (localStorage.getItem("uuid")) {
  uuid = localStorage.getItem("uuid");
} else {
  uuid = sessionStorage.getItem("uuid");
}

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
      location.reload();
    });
}
