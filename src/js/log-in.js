window.addEventListener("load", () => {
  document.getElementById("log-in-username").focus();
  document.getElementById("error").classList.add("hide");
});

const form = document.querySelector("form");

form.addEventListener("submit", logInFunction);

async function logInFunction(e) {
  e.preventDefault();

  const username = document.getElementById("log-in-username").value;
  const password = document.getElementById("log-in-password").value;

  const url = `https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data?username=eq.${username}`;
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
      document.getElementById("error").classList.remove("hide");
    }
    return res.json();
  });

  if (data.length > 0 && data[0].password === password) {
    if (document.getElementById("auto-log-in").checked) {
      localStorage.setItem("uuid", data[0].id);
    }
    document.getElementById("error").classList.add("hide");
    window.location.href = "/gemte-programmer";
  } else {
    document.getElementById("error").classList.remove("hide");
  }
}
