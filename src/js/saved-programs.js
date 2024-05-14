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

console.log(userData[0].saved_programs[0].programId);

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
    myClone
      .querySelector(".program-image")
      .setAttribute("src", `../assets/images/${data.programList[0]}.webp`);
    parentElement.appendChild(myClone);
  });
}
