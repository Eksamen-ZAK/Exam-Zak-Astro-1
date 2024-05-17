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
    myClone.querySelector(".program-name").textContent = data.goalTitle;
    myClone
      .querySelector(".edit-button")
      .setAttribute("id", `edit-${data.programId}`);
    myClone.querySelector(".start-date").textContent = data.startDate;
    myClone.querySelector(".end-date").textContent = data.endDate;
    myClone.querySelector(".goal-number").textContent = data.goalNumber;
    myClone
      .querySelector(".goal-image")
      .setAttribute(
        "src",
        `../assets/images/${data.goalProgramList.slice(0, 3)}.webp`
      );
    parentElement.appendChild(myClone);
  });
}
