window.addEventListener("load", () => localStorage.setItem("uuid", ""));
const uuid = sessionStorage.getItem("uuid");

const url = `https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data?id=eq.${uuid}`;
const api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

const options = {
  method: "GET",
  headers: {
    apikey: api,
  },
};

const data = await fetch(url, options).then((res) => {
  if (!res.ok) {
    window.location.href = "/";
  }
  return res.json();
});
